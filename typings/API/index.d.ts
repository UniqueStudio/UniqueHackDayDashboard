declare namespace API {
  type Response<S, M, T> = Promise<{
    httpStatusCode: S;
    message: M;
    data: T;
  }>;

  type ResponseWithoutData<S, M> = Promise<{
    httpStatusCode: S;
    message: M;
  }>;

  interface RequestWithAuth<P, M, T> extends RequestWithoutAuth<P, M, T> {
    headers: { Authorization: string };
  }

  interface RequestWithoutAuth<P, M, T> {
    endpoint: P;
    method: M;
    body: T;
  }

  namespace Message {
    // 下面这些是状态码为 4XX 时的 message
    type MissingField = 'MissingField';
    type RequestTooOften = 'RequestTooOften';

    type UsernameInvalid = 'UsernameInvalid';
    type PasswordInvalid = 'PasswordInvalid';
    type EmailInvalid = 'EmailInvalid';
    type TShirtSizeInvalid = 'TShirtSizeInvalid';
    type FileIdInvalid = 'FileIdInvalid';

    type EmailNotExists = 'EmailNotExists';
    type EmailExists = 'EmailExists';
    type UsernameExists = 'UsernameExists';

    type VerifyCodeNotFound = 'VerifyCodeNotFound';
    type TeamLeaderNotFound = 'TeamLeaderNotFound';
    type UserNotFound = 'UserNotFound';

    type Forbidden = 'Forbidden';
    type LoginNeeded = 'LoginNeeded';
    type PasswordWrong = 'PasswordWrong';

    // 这个是 200 的 message
    type Success = 'Success';
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
      ):
        | ResponseWithoutData<400, Message.MissingField>
        | ResponseWithoutData<400, Message.EmailExists>
        | ResponseWithoutData<400, Message.EmailInvalid>
        | ResponseWithoutData<200, Message.Success>;

      // 用邮件里面的 code 去完成注册
      (
        req: RequestWithoutAuth<
          '/v1/user/reg_verify',
          'POST',
          {
            code: string;
          }
        >,
      ):
        | ResponseWithoutData<400, Message.MissingField>
        | ResponseWithoutData<400, Message.VerifyCodeNotFound>
        | ResponseWithoutData<200, Message.Success>;

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
      ):
        | ResponseWithoutData<400, Message.MissingField>
        | ResponseWithoutData<400, Message.UserNotFound>
        | Response<200, Message.Success, { token: string }>;

      // change: 改密码，提供旧密码 API 直接返回 一个 code，使用该 code 改密码
      (
        req: RequestWithAuth<
          '/v1/user/password?change',
          'POST',
          {
            oldPassword: string;
            newPassword: string;
          }
        >,
      ):
        | ResponseWithoutData<400, Message.MissingField>
        | ResponseWithoutData<401, Message.LoginNeeded>
        | ResponseWithoutData<400, Message.PasswordInvalid>
        | ResponseWithoutData<200, Message.Success>;

      // reset: 重置密码，提供一个邮箱，可以得到一个带有code 的链接
      (
        req: RequestWithoutAuth<
          '/v1/user/password?reset',
          'POST',
          {
            email: string;
          }
        >,
      ):
        | ResponseWithoutData<400, Message.MissingField>
        | ResponseWithoutData<400, Message.EmailNotExists>
        | ResponseWithoutData<200, Message.Success>;

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
      ):
        | ResponseWithoutData<400, Message.MissingField>
        | ResponseWithoutData<400, Message.PasswordInvalid>
        | ResponseWithoutData<200, Message.Success>;

      // 添加 detail 的接口
      (
        req: RequestWithAuth<
          '/v1/user/detail',
          'POST',
          // Partial 意为所有字段可选
          UserDetailRequest
        >,
      ):
        | ResponseWithoutData<400, Message.MissingField>
        | ResponseWithoutData<400, Message.TShirtSizeInvalid>
        | ResponseWithoutData<401, Message.LoginNeeded>
        | ResponseWithoutData<400, Message.TeamLeaderNotFound>
        | ResponseWithoutData<200, Message.Success>;

      // 修改 detail 的接口
      (
        req: RequestWithAuth<
          '/v1/user/detail',
          'PUT',
          // Partial 意为所有字段可选
          Partial<UserDetailRequest>
        >,
      ):
        | ResponseWithoutData<400, Message.MissingField>
        | ResponseWithoutData<400, Message.TShirtSizeInvalid>
        | ResponseWithoutData<401, Message.LoginNeeded>
        | ResponseWithoutData<400, Message.TeamLeaderNotFound>
        | ResponseWithoutData<200, Message.Success>;

      // 检查是否重复的接口
      (
        req: RequestWithAuth<
          '/v1/user/existence?type=username' | '/v1/user/existence?type=email',
          'GET',
          // Partial 意为所有字段可选
          {
            valueToCheck: string;
          }
        >,
      ):
        | ResponseWithoutData<400, Message.MissingField>
        | ResponseWithoutData<400, Message.UsernameInvalid>
        | ResponseWithoutData<400, Message.EmailInvalid>
        | Response<200, Message.Success, { existence: boolean }>;
    }
  }

  // namespace

  type RequestFunc = User.RequestFunc;
}
