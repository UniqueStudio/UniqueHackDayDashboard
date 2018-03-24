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
    PhoneNotExists = 'PhoneNotExists',
    TeamNotExists = 'TeamNotExists',
    InvitationNotExists = 'InvitationNotExists',

    CodeNotMatch = 'CodeNotMatch',
    HumanCheckFailed = 'HumanCheckFailed',

    VerifyCodeNotFound = 'VerifyCodeNotFound',
    TeamLeaderNotFound = 'TeamLeaderNotFound',
    UserNotFound = 'UserNotFound',

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
      gender: 'boy' | 'girl' | 'other';
      birthday: string;
      phone: string;
      resume: FileID;
      tShirtSize: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
      city: string;
      alipay: string;
      school: string;
      major: string;
      grade: string;
      graduateTime: Time; // 年月日
      urgentConcat: {
        name: string;
        phone: string;
        relationship: string;
      };

      collections?: FileID;
      specialNeeds?: string;
      github?: string;
      linkedIn?: string;
      codeingDotNet?: string;
      blog?: string;
      otherAccount?: {
        platform: string;
        username: string;
      };

      role: string[]; // 产品，设计，前端，后端，机器学习，硬件开发，其他
      skills: string[];
      hackdayTimes: number;
      hasTeamedUp?: {
        teamLeaderName: string;
        teamLeaderEmail: string;
      };
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
          '/v1/user/send_sms',
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
      (
        req: RequestWithAuth<
          '/v1/user/detail',
          'POST',
          // Partial 意为所有字段可选
          UserDetailRequest
        >,
      ): Response<
        | ResponseWithoutData<400, Message.TShirtSizeInvalid>
        | ResponseWithoutData<401, Message.LoginNeeded>
        | ResponseWithoutData<400, Message.TeamLeaderNotFound>
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
    }
  }

  namespace Team {
    interface UserInTeam {
      username: string;
      name: string;
      school: string;
      email?: string;
    }

    interface RequestFunc {
      // 搜索用户的接口，在实现时应该注意安全，最多返回 5 个条目，按照匹配程度排序
      (
        req: RequestWithAuth<
          '/v1/user/search',
          'GET',
          {
            keyword: string;
          }
        >,
      ): Response<
        | ResponseWithoutData<401, Message.LoginNeeded>
        | ResponseWithData<200, Message.Success, { users: UserInTeam[] }>
      >;

      // 创建队伍的接口
      (
        req: RequestWithAuth<
          '/v1/team/teams',
          'POST',
          {
            name: string;
            // members: string[];
            // teamId: string;
            // teamLeader: string;
          }
        >,
      ): Response<
        | ResponseWithoutData<401, Message.LoginNeeded>
        | ResponseWithoutData<400, Message.UserNotFound>
        | ResponseWithoutData<403, Message.Forbidden>
        | ResponseWithoutData<200, Message.Success>
      >;

      // 删除队伍的接口
      (
        req: RequestWithAuth<
          '/v1/team/teams',
          'POST',
          {
            teamId: string;
          }
        >,
      ): Response<
        | ResponseWithoutData<401, Message.LoginNeeded>
        | ResponseWithoutData<400, Message.TeamNotExists>
        | ResponseWithoutData<403, Message.Forbidden>
        | ResponseWithoutData<200, Message.Success>
      >;

      // 修改队长的接口
      (
        req: RequestWithAuth<
          '/v1/team/team_leader',
          'PUT',
          {
            teamId: string;
            teamLeader: string;
          }
        >,
      ): Response<
        | ResponseWithoutData<401, Message.LoginNeeded>
        | ResponseWithoutData<400, Message.TeamNotExists>
        | ResponseWithoutData<400, Message.UserNotFound>
        | ResponseWithoutData<403, Message.Forbidden>
        | ResponseWithoutData<200, Message.Success>
      >;

      // 添加队员的接口
      (
        req: RequestWithAuth<
          '/v1/team/invitations',
          'POST',
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

      // 取消邀请的接口
      (
        req: RequestWithAuth<
          '/v1/team/invitations',
          'DELETE',
          {
            username: string;
            teamId: string;
          }
        >,
      ): Response<
        | ResponseWithoutData<401, Message.LoginNeeded>
        | ResponseWithoutData<400, Message.InvitationNotExists>
        | ResponseWithoutData<400, Message.TeamNotExists>
        | ResponseWithoutData<400, Message.UserNotFound>
        | ResponseWithoutData<403, Message.Forbidden>
        | ResponseWithoutData<200, Message.Success>
      >;

      // 同意入队的接口
      (
        req: RequestWithAuth<
          '/v1/team/accept',
          'POST',
          {
            teamId: string;
          }
        >,
      ): Response<
        | ResponseWithoutData<401, Message.LoginNeeded>
        | ResponseWithoutData<400, Message.TeamNotExists>
        | ResponseWithoutData<400, Message.InvitationNotExists>
        | ResponseWithoutData<200, Message.Success>
      >;

      // 删除队员的接口
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

      // 获取队伍信息的接口
      (
        req: RequestWithAuth<
          '/v1/team/teams',
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
              teamLeader: UserInTeam;
              members: UserInTeam[];
              teamedUpTime: string;
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

  type RequestFunc = User.RequestFunc;
}
