declare namespace API {
  type ResponseWithData<S, M, T> = {
    httpStatusCode: S;
    message: M;
    data: T;
  };

  type ResponseWithoutData<S, M> = {
    httpStatusCode: S;
    message: M;
  };

  // 这是公共的错误，所有响应都应包含下面的错误提示
  type Response<T> = Promise<
    | ResponseWithoutData<600, Message.NetworkError>
    | ResponseWithoutData<500, Message.InternalServerError>
    | ResponseWithoutData<400, Message.MissingField>
    | ResponseWithoutData<400, Message.RequestTooOften>
    | ResponseWithoutData<400, Message.BadJson>
    | T
  >;

  interface RequestWithAuth<P, M, T> extends RequestWithoutAuth<P, M, T> {
    headers?: { Authorization: string; [k: string]: string };
  }

  interface RequestWithoutAuth<P, M, T> {
    headers?: { [k: string]: string };
    endpoint: P;
    method: M;
    body?: T;
  }

  enum Message {
    InternalServerError = 'InternalServerError',
    NetworkError = 'NetworkError',

    // 下面这些是状态码为 4XX 时的 message
    MissingField = 'MissingField',
    BadJson = 'BadJson',
    RequestTooOften = 'RequestTooOften',

    UsernameInvalid = 'UsernameInvalid',
    PasswordInvalid = 'PasswordInvalid',
    EmailInvalid = 'EmailInvalid',
    PhoneInvalid = 'PhoneInvalid',
    TShirtSizeInvalid = 'TShirtSizeInvalid',
    FileIdInvalid = 'FileIdInvalid',

    UsernameExists = 'UsernameExists',
    PhoneExists = 'PhoneExists',
    TeamNameExists = 'TeamNameExists',
    PhoneNotExists = 'PhoneNotExists',
    TeamNotExists = 'TeamNotExists',
    InvitationNotExists = 'InvitationNotExists',

    CodeNotMatch = 'CodeNotMatch',
    HumanCheckFailed = 'HumanCheckFailed',

    VerifyCodeNotFound = 'VerifyCodeNotFound',
    TeamLeaderNotFound = 'TeamLeaderNotFound',
    UserNotFound = 'UserNotFound',

    TeamFull = 'TeamFull',
    AlreadyTeamedUp = 'AlreadyTeamedUp',

    Forbidden = 'Forbidden',
    LoginNeeded = 'LoginNeeded',
    PasswordWrong = 'PasswordWrong',

    // 这个是 200 的 message
    Success = 'Success',
  }

  type FileID = string;
  type Time = string;

  namespace User {
    interface UserDetailRequest {
      name: string;
      gender: '男' | '女' | '其他';
      birthday: string;
      email: string;
      resume: FileID[];
      tShirtSize: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
      city: string;
      alipay: string;
      school: string;
      major: string;
      grade: string;
      graduateTime: Time; // 年月日
      urgentConcatName: string;
      urgentConcatPhone: string;
      urgentConcatRelationship: string;

      collection?: FileID[];
      specialNeeds?: string;
      github?: string;
      linkedIn?: string;
      codeingDotNet?: string;
      blog?: string;

      role: string[]; // 产品，设计，前端，后端，机器学习，硬件开发，其他
      skills: string[];
      hackdayTimes: number;
    }

    interface RequestFunc {
      // 注册的接口
      (
        req: RequestWithoutAuth<
          '/v1/user/reg',
          'POST',
          {
            username: string;
            password: string;
            phone: string;
            code: string;
            antiRobotToken: string;
          }
        >,
      ): Response<
        | ResponseWithoutData<400, Message.UsernameExists>
        | ResponseWithoutData<400, Message.UsernameInvalid>
        | ResponseWithoutData<400, Message.PhoneExists>
        | ResponseWithoutData<400, Message.PhoneInvalid>
        | ResponseWithoutData<400, Message.CodeNotMatch>
        | ResponseWithoutData<200, Message.Success>
      >;

      // 发短信
      (
        req: RequestWithoutAuth<
          '/v1/user/send_sms/register',
          'POST',
          {
            phone: string;
            antiRobotToken: string;
          }
        >,
      ): Response<
        ResponseWithoutData<400, Message.PhoneInvalid> | ResponseWithoutData<200, Message.Success>
      >;

      (
        req: RequestWithoutAuth<
          '/v1/user/send_sms/reset',
          'POST',
          {
            phone: string;
            antiRobotToken: string;
          }
        >,
      ): Response<
        ResponseWithoutData<400, Message.PhoneInvalid> | ResponseWithoutData<200, Message.Success>
      >;

      // 登录的接口
      (
        req: RequestWithoutAuth<
          '/v1/user/login',
          'POST',
          {
            usernameOrPhone: string;
            password: string;
            antiRobotToken: string;
          }
        >,
      ): Response<
        | ResponseWithoutData<400, Message.UserNotFound>
        | ResponseWithData<200, Message.Success, { token: string }>
      >;

      // change: 改密码，提供旧密码和新密码直接修改
      (
        req: RequestWithAuth<
          '/v1/user/password?change',
          'POST',
          {
            oldPassword: string;
            newPassword: string;
          }
        >,
      ): Response<
        | ResponseWithoutData<401, Message.LoginNeeded>
        | ResponseWithoutData<400, Message.PasswordInvalid>
        | ResponseWithoutData<200, Message.Success>
      >;

      // reset: 重置密码
      (
        req: RequestWithoutAuth<
          '/v1/user/password?reset',
          'POST',
          {
            phone: string;
            code: string;
            newPassword: string;
            antiRobotToken: string;
          }
        >,
      ): Response<
        | ResponseWithoutData<400, Message.PasswordInvalid>
        | ResponseWithoutData<400, Message.PhoneNotExists>
        | ResponseWithoutData<400, Message.CodeNotMatch>
        | ResponseWithoutData<200, Message.Success /* to force it break line */>
      >;

      // 添加 detail 的接口
      (req: RequestWithAuth<'/v1/user/detail', 'POST', UserDetailRequest>): Response<
        | ResponseWithoutData<400, Message.TShirtSizeInvalid>
        | ResponseWithoutData<401, Message.LoginNeeded>
        | ResponseWithoutData<200, Message.Success>
      >;

      // 修改 detail 的接口
      (
        req: RequestWithAuth<
          '/v1/user/detail',
          'PUT',
          // Partial 意为所有字段可选
          Partial<UserDetailRequest>
        >,
      ): Response<
        | ResponseWithoutData<400, Message.TShirtSizeInvalid>
        | ResponseWithoutData<401, Message.LoginNeeded>
        | ResponseWithoutData<400, Message.TeamLeaderNotFound>
        | ResponseWithoutData<200, Message.Success>
      >;

      // 检查是否重复的接口
      (
        req: RequestWithoutAuth<
          | '/v1/user/existence?type=username'
          | '/v1/user/existence?type=email'
          | '/v1/user/existence?type=phone',
          'GET',
          {
            valueToCheck: string;
          }
        >,
      ): Response<
        | ResponseWithoutData<400, Message.UsernameInvalid>
        | ResponseWithoutData<400, Message.PhoneInvalid>
        | ResponseWithoutData<400, Message.EmailInvalid>
        | ResponseWithData<200, Message.Success, { existence: boolean }>
      >;

      // 检查是否已经登录，服务端可以在这里返回 token 来更新 token
      (req: RequestWithAuth<'/v1/user/login_status', 'GET', never>): Response<
        ResponseWithoutData<401, Message.LoginNeeded> | ResponseWithoutData<200, Message.Success>
      >;

      (req: RequestWithAuth<'/v1/user/info', 'GET', never>): Response<
        | ResponseWithoutData<401, Message.LoginNeeded>
        | ResponseWithData<
            200,
            Message.Success,
            {
              username: string;
              phone: string;
              name: string | null;
              // 详情是否提交
              isDetailFormSubmitted: boolean;
              // 组队信息是否提交
              isTeamFormSubmitted: boolean;
              // 详情以及组队信息都提交算成功报名
              // applied: boolean;
              isAdmin: boolean;
              // 一定已注册了
              registrered: true;
              teamId: string | null;
              // (applied && isAccepted === null) 意味着是 pending 状态
              isAccepted: boolean | null;
              confirmed: boolean | null;
              checkedIn: boolean | null;
              projectId: string | null;
              awardId: string | null;
              // 报销: 0: 不需要报销但是已经确认报销数据  null: 未进行到报销流程, 其他数字: 报销金额
              reimbursement: number | null;
              awardMoneyGiven: boolean | null;
              awardItemGiven: boolean | null;
              invoiceRevived: boolean | null;
            }
          >
      >;

      (
        req: RequestWithAuth<
          '/v1/user/username',
          'GET',
          {
            name: string;
            phone: string;
          }
        >,
      ): Response<
        | ResponseWithoutData<401, Message.LoginNeeded>
        | ResponseWithData<200, Message.Success, { username: string }>
      >;

      (
        req: RequestWithAuth<
          '/v1/user/team_form_submit_status',
          'POST',
          {
            submitted: boolean;
          }
        >,
      ): Response<
        ResponseWithoutData<401, Message.LoginNeeded> | ResponseWithoutData<403, Message.Forbidden>
      >;
    }
  }

  namespace Team {
    interface UserInTeam {
      username: string;
      name: string;
      isAccepted: boolean;
      school: string;
      email?: string;
    }

    interface RequestFunc {
      // 创建队伍的接口，任意用户可调用，管理员调用时，必须提供teamLeader
      (
        req: RequestWithAuth<
          '/v1/team/teams',
          'POST',
          {
            teamLeader?: string;
            name: string;
          }
        >,
      ): Response<
        | ResponseWithoutData<401, Message.LoginNeeded>
        | ResponseWithoutData<400, Message.UserNotFound>
        | ResponseWithoutData<400, Message.AlreadyTeamedUp>
        | ResponseWithoutData<400, Message.TeamNameExists>
        | ResponseWithoutData<403, Message.Forbidden>
        | ResponseWithData<200, Message.Success, { teamId: string }>
      >;

      // 删除队员的接口，只有队长身份 / 管理员可以调用
      (
        req: RequestWithAuth<
          '/v1/team/members',
          'DELETE',
          {
            username: string;
            teamId: string;
          }
        >,
      ): Response<
        | ResponseWithoutData<401, Message.LoginNeeded>
        | ResponseWithoutData<400, Message.TeamNotExists>
        | ResponseWithoutData<400, Message.UserNotFound>
        | ResponseWithoutData<403, Message.Forbidden>
        | ResponseWithoutData<200, Message.Success>
      >;

      // 鉴权提示
      // 队员加队长: 要求1.登录、2.队伍存在、3.用户名是自己 即可
      // 队长加队员: 要求1.队伍是自己的、2.用户名不是自己、即可
      // 权限不满足，返回 forbidden
      (
        req: RequestWithAuth<
          '/v1/team/members',
          'POST',
          {
            username: string;
            teamId: string;
          }
        >,
      ): Response<
        | ResponseWithoutData<401, Message.LoginNeeded>
        | ResponseWithoutData<400, Message.TeamNotExists>
        | ResponseWithoutData<400, Message.TeamFull>
        | ResponseWithoutData<400, Message.AlreadyTeamedUp>
        | ResponseWithoutData<403, Message.Forbidden>
        | ResponseWithoutData<200, Message.Success>
      >;

      // 转移队长身份的接口，只有队长身份 / 管理员可以调用
      (
        req: RequestWithAuth<
          '/v1/team/team_leader',
          'PUT',
          {
            username: string;
            teamId: string;
          }
        >,
      ): Response<
        | ResponseWithoutData<401, Message.LoginNeeded>
        | ResponseWithoutData<400, Message.TeamNotExists>
        | ResponseWithoutData<400, Message.UserNotFound>
        | ResponseWithoutData<403, Message.Forbidden>
        | ResponseWithoutData<200, Message.Success>
      >;

      // 填写队长信息获取team_id
      (
        req: RequestWithAuth<
          '/v1/team/id',
          'GET',
          {
            teamLeaderName: string;
            teamLeaderPhone: string;
          }
        >,
      ): Response<
        | ResponseWithoutData<401, Message.LoginNeeded>
        | ResponseWithoutData<400, Message.TeamNotExists>
        | ResponseWithoutData<400, Message.TeamLeaderNotFound>
        | ResponseWithoutData<403, Message.Forbidden>
        | ResponseWithData<200, Message.Success, { teamId: string }>
      >;

      // 获取队伍信息
      (
        req: RequestWithAuth<
          '/v1/team/team_info',
          'GET',
          {
            teamId: string;
          }
        >,
      ): Response<
        | ResponseWithoutData<401, Message.LoginNeeded>
        | ResponseWithoutData<400, Message.TeamNotExists>
        | ResponseWithoutData<403, Message.Forbidden>
        | ResponseWithData<
            200,
            Message.Success,
            {
              name: string;
              teamLeader: UserInTeam;
              members: UserInTeam[];
              createdTime: string;
              prizeInfo: string;
            }
          >
      >;
    }
  }

  namespace File {
    interface RequestFunc {
      // 变异请求，发送一个文件，Content-Type 为 form-data
      (req: RequestWithAuth<'/v1/file/files', 'POST', {}>): Response<
        | ResponseWithoutData<401, Message.LoginNeeded>
        | ResponseWithData<200, Message.Success, { fileId: string }>
      >;
    }
  }

  namespace Message {
    enum MessageType {
      LoginElseWhere = 'LoginElseWhere', // 别处登录，被迫下线
      NewTeammate = 'NewTeammate', // 新的队友加入
      Accepted = 'Accepted', // 通过审核
      Rejected = 'Rejected', // 被拒绝参赛
      OtherMessage = 'OtherMessage',
    }

    type MessageValue = string | { en: string; zh: string };

    type SingleMessage =
      | {
          id: string;
          type: MessageType.LoginElseWhere;
          time: number; // Timestamp
        }
      | {
          id: string;

          type: MessageType.Rejected;
          rejectedReason: MessageValue;
          time: number; // Timestamp
        }
      | {
          id: string;

          type: MessageType.Accepted;
          rejectedExtraMsg?: MessageValue;
          time: number; // Timestamp
        }
      | {
          id: string;

          type: MessageType.OtherMessage;
          value: MessageValue;
          title: MessageValue;
          time: number; // Timestamp
        }
      | {
          id: string;

          type: MessageType.NewTeammate;
          newTeammateInfo: API.Team.UserInTeam;
          time: number; // Timestamp
        };

    interface RequestFunc {
      // 如果该用户有消息，立刻返回所有消息，并清除这些消息。
      // 如果用户没有消息，等待 1min 返回
      // 如果在等待的过程中，有新的消息，立刻返回
      (req: RequestWithAuth<'/v1/message/messages/new', 'GET', never>): Response<
        | ResponseWithoutData<401, Message.LoginNeeded>
        | ResponseWithData<200, Message.Success, { messages: SingleMessage[] }>
      >;

      // 没有等待。
      // 直接返回**所有未读**的消息
      (req: RequestWithAuth<'/v1/message/messages/all?filter=unread', 'GET', never>): Response<
        | ResponseWithoutData<401, Message.LoginNeeded>
        | ResponseWithData<200, Message.Success, { messages: SingleMessage[] }>
      >;

      // 没有等待。
      // 直接返回**所有**的消息
      (req: RequestWithAuth<'/v1/message/messages/all', 'GET', never>): Response<
        | ResponseWithoutData<401, Message.LoginNeeded>
        | ResponseWithData<200, Message.Success, { messages: SingleMessage[] }>
      >;

      // 将一条消息设为已读
      (
        req: RequestWithAuth<'/v1/message/read_status', 'PUT', { id: string; status: 'read' }>,
      ): Response<
        ResponseWithoutData<401, Message.LoginNeeded> | ResponseWithoutData<200, Message.Success>
      >;
    }
  }

  type RequestFunc = User.RequestFunc & Team.RequestFunc & File.RequestFunc & Message.RequestFunc;
}
