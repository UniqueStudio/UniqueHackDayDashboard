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
    headers: { Authorization: string; [k: string]: string };
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
    TShirtSizeInvalid = 'TShirtSizeInvalid',
    FileIdInvalid = 'FileIdInvalid',

    EmailNotExists = 'EmailNotExists',
    EmailExists = 'EmailExists',
    UsernameExists = 'UsernameExists',

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
      gender: string;
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
            email: string;
          }
        >,
      ): Response<
        | ResponseWithoutData<400, Message.EmailExists>
        | ResponseWithoutData<400, Message.EmailInvalid>
        | ResponseWithoutData<200, Message.Success>
      >;

      // 用邮件里面的 code 去完成注册
      (
        req: RequestWithoutAuth<
          '/v1/user/reg_verify',
          'POST',
          {
            code: string;
          }
        >,
      ): Response<
        | ResponseWithoutData<400, Message.VerifyCodeNotFound>
        | ResponseWithoutData<200, Message.Success>
      >;

      // 登陆的接口
      (
        req: RequestWithoutAuth<
          '/v1/user/login',
          'POST',
          {
            usernameOrEmail: string;
            password: string;
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

      // reset: 重置密码，提供一个邮箱，可以得到一个带有code 的链接
      (
        req: RequestWithoutAuth<
          '/v1/user/password?reset',
          'POST',
          {
            email: string;
          }
        >,
      ): Response<
        | ResponseWithoutData<400, Message.EmailNotExists>
        | ResponseWithoutData<200, Message.Success /* to force it break line */>
      >;

      // 重置密码的共用部分
      (
        req: RequestWithoutAuth<
          '/v1/user/password',
          'PUT',
          {
            code: string;
            newPassword: string;
          }
        >,
      ): Response<
        | ResponseWithoutData<400, Message.PasswordInvalid>
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
          '/v1/user/existence?type=username' | '/v1/user/existence?type=email',
          'GET',
          {
            valueToCheck: string;
          }
        >,
      ): Response<
        | ResponseWithoutData<400, Message.UsernameInvalid>
        | ResponseWithoutData<400, Message.EmailInvalid>
        | ResponseWithData<200, Message.Success, { existence: boolean }>
      >;

      // 检查是否已经登陆，服务端可以在这里返回 token 来更新 token
      (req: RequestWithAuth<'/v1/user/login_status', 'GET', never>): Response<
        ResponseWithoutData<401, Message.LoginNeeded> | ResponseWithoutData<200, Message.Success>
      >;
    }
  }

  // namespace

  type RequestFunc = User.RequestFunc;
}
