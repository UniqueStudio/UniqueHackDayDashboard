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
        EmailExists = 'EmailExists',
        TeamNameExists = 'TeamNameExists',
        PhoneNotExists = 'PhoneNotExists',
        TeamNotExists = 'TeamNotExists',

        CodeNotMatch = 'CodeNotMatch',
        HumanCheckFailed = 'HumanCheckFailed',

        VerifyCodeNotFound = 'VerifyCodeNotFound',
        TeamLeaderNotFound = 'TeamLeaderNotFound',
        UserNotFound = 'UserNotFound',

        TeamFull = 'TeamFull',
        AlreadyTeamedUp = 'AlreadyTeamedUp',

        Forbidden = 'Forbidden',
        LoginNeeded = 'LoginNeeded',
        ApplyNeeded = 'ApplyNeeded',
        PasswordWrong = 'PasswordWrong',

        // 这个是 200 的 message
        Success = 'Success',
    }

    interface FileID {
        id: string;
        fileName: string;
    }
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
            codingDotNet?: string;
            blog?: string;

            role: string[]; // 产品，设计，前端，后端，机器学习，硬件开发，其他
            skills: string[];
            hackdayTimes: number;
            resumeToSponsor: boolean;
            resumeForWork: boolean;
        }

        interface UserInfo {
            username: string;
            phone: string;
            name: string | null;
            // 详情是否提交
            isDetailFormSubmitted: boolean;
            // 是否已经走完组队的流程
            isTeamFormSubmitted: boolean;
            // 是否确认报名
            isApplyConfirmed: boolean;
            // 上面三个都为 true 算成功报名
            // 0 普通 1 管理员 2 超级管理员
            permission: 0 | 1 | 2;
            // 一定已注册了
            registrered: true;
            teamId: number | null;
            // (applied && isAccepted === null) 意味着是 pending 状态
            isAccepted: boolean | null;
            // 为 true 表示已确认参赛、false 表示确认不参赛、null 表示未作出选择
            confirmed: boolean | null;
            checkedIn: boolean | null;
            projectId: string | null;
            awardId: string | null;
            inWaitList?: boolean;
            // 报销: 0: 不需要报销但是已经确认报销数据  null: 未进行到报销流程, 其他数字: 报销金额
            reimbursement: number | null;
            awardMoneyGiven: boolean | null;
            awardItemGiven: boolean | null;
            invoiceRevived: boolean | null;
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
                | ResponseWithData<200, Message.Success, { token: string }>
            >;

            // 发短信
            (
                req: RequestWithoutAuth<
                    '/v1/user/send_sms?t=register',
                    'POST',
                    {
                        phone: string;
                        antiRobotToken: string;
                    }
                >,
            ): Response<
                | ResponseWithoutData<400, Message.PhoneInvalid>
                | ResponseWithoutData<200, Message.Success>
            >;

            (
                req: RequestWithoutAuth<
                    '/v1/user/send_sms?t=reset',
                    'POST',
                    {
                        phone: string;
                        antiRobotToken: string;
                    }
                >,
            ): Response<
                | ResponseWithoutData<400, Message.PhoneInvalid>
                | ResponseWithoutData<200, Message.Success>
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
                    '/v1/user/password?t=change',
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
                    '/v1/user/password?t=reset',
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

            // 获取 detail 的接口
            (req: RequestWithAuth<'/v1/user/detail', 'GET', never>): Response<
                | ResponseWithoutData<400, Message.ApplyNeeded>
                | ResponseWithoutData<401, Message.LoginNeeded>
                | ResponseWithData<200, Message.Success, UserDetailRequest>
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
                | ResponseWithoutData<401, Message.LoginNeeded>
                | ResponseWithoutData<200, Message.Success>
            >;

            (req: RequestWithAuth<'/v1/user/info', 'GET', never>): Response<
                | ResponseWithoutData<401, Message.LoginNeeded>
                | ResponseWithData<200, Message.Success, UserInfo>
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

            // 这个接口导致 user/info 种的 isApplyConfirmed 变为 true 或 false
            (
                req: RequestWithAuth<
                    '/v1/user/confirm',
                    'PUT',
                    {
                        confirmation: boolean;
                    }
                >,
            ): Response<
                | ResponseWithoutData<401, Message.LoginNeeded>
                | ResponseWithoutData<400, Message.Forbidden>
                | ResponseWithoutData<200, Message.Success>
            >;

            // 这个接口导致 user/info 种的 confirmed 变为 true 或 false
            (
                req: RequestWithAuth<
                    '/v1/user/confirm',
                    'DELETE',
                    {
                        confirmation: boolean;
                    }
                >,
            ): Response<
                | ResponseWithoutData<401, Message.LoginNeeded>
                | ResponseWithoutData<400, Message.Forbidden>
                | ResponseWithoutData<200, Message.Success>
            >;

            //

            (
                req: RequestWithAuth<
                    '/v1/user/team_form_submit_status',
                    'POST',
                    {
                        submitted: boolean;
                    }
                >,
            ): Response<
                | ResponseWithoutData<401, Message.LoginNeeded>
                | ResponseWithoutData<200, Message.Success>
            >;
        }
    }

    namespace Team {
        interface UserInTeam {
            username: string;
            name: string;
            isAccepted: boolean | null;
            school: string;
            email?: string;
        }

        interface TeamInfo {
            teamName: string;
            teamLeader: UserInTeam;
            members: UserInTeam[];
            createdTime: number;
            prizeInfo: string;
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
                | ResponseWithData<200, Message.Success, { teamId: number }>
            >;

            // 删除队员的接口，只有队长身份 / 管理员可以调用
            (
                req: RequestWithAuth<
                    '/v1/team/members',
                    'DELETE',
                    {
                        username: string;
                        teamId: number;
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
                        teamId: number;
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
                    '/v1/team/leader',
                    'PUT',
                    {
                        username: string;
                        teamId: number;
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
                | ResponseWithData<200, Message.Success, { teamId: number }>
            >;

            // 获取队伍信息
            (
                req: RequestWithAuth<
                    '/v1/team/info',
                    'GET',
                    {
                        teamId: number;
                    }
                >,
            ): Response<
                | ResponseWithoutData<401, Message.LoginNeeded>
                | ResponseWithoutData<400, Message.TeamNotExists>
                | ResponseWithoutData<403, Message.Forbidden>
                | ResponseWithData<200, Message.Success, TeamInfo>
            >;

            // 解散队伍
            (
                req: RequestWithAuth<
                    '/v1/team/teams',
                    'DELETE',
                    {
                        teamId: number;
                    }
                >,
            ): Response<
                | ResponseWithoutData<401, Message.LoginNeeded>
                | ResponseWithoutData<400, Message.TeamNotExists>
                | ResponseWithoutData<403, Message.Forbidden>
                | ResponseWithData<200, Message.Success, TeamInfo>
            >;
        }
    }

    namespace File {
        interface RequestFunc {
            // 变异请求，发送一个文件，Content-Type 为 form-data
            (
                req: RequestWithAuth<'/v1/files?t=resume' | '/v1/files?t=collection', 'POST', {}>,
            ): Response<
                | ResponseWithoutData<401, Message.LoginNeeded>
                | ResponseWithData<200, Message.Success, { fileId: string }>
            >;
        }
    }

    namespace Message {
        enum MessageType {
            LoginElseWhere = 'LoginElseWhere', // 别处登录，被迫下线
            NewTeammate = 'NewTeammate', // 新的队友加入
            TeamCreated = 'TeamCreated', // 成功创建队伍
            TeamJoined = 'TeamJoined', // 成功加入队伍
            ApplyComplete = 'ApplyComplete', // 您已成功报名unique hackday
            Accepted = 'Accepted', // 通过审核
            Rejected = 'Rejected', // 被拒绝参赛
            ApplyNeedsConfirm = 'ApplyNeedsConfirm', // 请确认参赛
            ApplyConfirmed = 'ApplyConfirmed', // 已确认参赛
            ApplyCanceled = 'ApplyCanceled', // 已取消参赛
            HackExited = 'HackExited', // 已退出比赛
            OtherMessage = 'OtherMessage',
        }

        type MessageValue = string | { en: string; zh: string };

        type SingleMessage =
            | {
                  id: number;

                  type: MessageType.LoginElseWhere;
                  time: number; // Timestamp
              }
            | {
                  id: number;

                  type: MessageType.Rejected;
                  rejectedReason: MessageValue;
                  time: number; // Timestamp
              }
            | {
                  id: number;

                  type: MessageType.Accepted;
                  acceptExtraMsg?: MessageValue;
                  time: number; // Timestamp
              }
            | {
                  id: number;

                  type: MessageType.TeamCreated;
                  newTeamInfo: API.Team.TeamInfo;
                  time: number; // Timestamp
              }
            | {
                  id: number;

                  type: MessageType.TeamJoined;
                  newTeamInfo: API.Team.TeamInfo;
                  time: number; // Timestamp=
              }
            | {
                  id: number;

                  type: MessageType.NewTeammate;
                  newTeammateInfo: API.Team.UserInTeam;
                  time: number; // Timestamp
              }
            | {
                  id: number;

                  type: MessageType.ApplyComplete;
                  time: number; // Timestamp
              }
            | {
                  id: number;

                  type: MessageType.ApplyNeedsConfirm;
                  time: number; // Timestamp
              }
            | {
                  id: number;

                  type: MessageType.ApplyConfirmed;
                  time: number; // Timestamp
              }
            | {
                  id: number;

                  type: MessageType.ApplyCanceled;
                  time: number; // Timestamp
              }
            | {
                  id: number;

                  type: MessageType.HackExited;
                  reason: MessageValue;
                  time: number; // Timestamp
              }
            | {
                  id: number;

                  type: MessageType.OtherMessage;
                  value: MessageValue;
                  title: MessageValue;
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
            (
                req: RequestWithAuth<'/v1/message/messages/all?filter=unread', 'GET', never>,
            ): Response<
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
                req: RequestWithAuth<
                    '/v1/message/read_status',
                    'PUT',
                    { id: number; status: 'read' }
                >,
            ): Response<
                | ResponseWithoutData<401, Message.LoginNeeded>
                | ResponseWithoutData<200, Message.Success>
            >;

            // 将一条消息删除
            (req: RequestWithAuth<'/v1/message/messages', 'DELETE', { id: number }>): Response<
                | ResponseWithoutData<401, Message.LoginNeeded>
                | ResponseWithoutData<200, Message.Success>
            >;

            (req: RequestWithAuth<'/v1/files', 'DELETE', { id: string; type: string }>): Response<
                | ResponseWithoutData<401, Message.LoginNeeded>
                | ResponseWithoutData<200, Message.Success>
            >;
        }
    }

    namespace Admin {
        interface AdminUserInfo {
            isLeader: boolean;
            teamId: null | string;
            name: string;
            school: string;
            city: string;
            grade: string;
            resume: any;
            username: string;
            edited: number;
            collection: string;
            verifyState: 0 | 1 | 2 | 3 | 4;
            adminDict: {
                0: string[];
                1: string[];
            };
            inWaitList: boolean;
        }
        interface AdminUserState {
            username: string;
            state?: 0 | 1;
            inWaitList?: boolean;
        }
        interface RequestFunc {
            (req: RequestWithAuth<'/v1/admin/verify/teams', 'GET', {}>): Response<
                | ResponseWithoutData<401, Message.LoginNeeded>
                | ResponseWithoutData<400, Message.TeamNotExists>
                | ResponseWithoutData<403, Message.Forbidden>
                | ResponseWithData<200, Message.Success, { items: AdminUserInfo[] }>
            >;

            (
                req: RequestWithAuth<
                    '/v1/admin/verify/change',
                    'POST',
                    { value: AdminUserState[] }
                >,
            ): Response<
                | ResponseWithoutData<401, Message.LoginNeeded>
                | ResponseWithoutData<400, Message.TeamNotExists>
                | ResponseWithoutData<403, Message.Forbidden>
                | ResponseWithoutData<200, Message.Success>
            >;
        }
    }

    type RequestFunc = User.RequestFunc &
        Team.RequestFunc &
        File.RequestFunc &
        Message.RequestFunc &
        Admin.RequestFunc;
}
