declare namespace API {
  interface Response<S, M, T> extends NoDataResponse<S, M> {
    data: T;
  }

  interface NoDataResponse<S, M> {
    httpStatusCode: S;
    message: M;
  }

  namespace Message {
    // 下面这些是状态码为 4XX 时的 message
    type MissingField = 'MissingField';
    type LoginNeeded = 'LoginNeeded';
    type Forbidden = 'Forbidden';
    type EmailExists = 'EmailExists';
    type UsernameInvalid = 'UsernameInvalid';
    type UsernameExists = 'UsernameExists';
    type VerifyCodeNotFound = 'VerifyCodeNotFound';
    type PasswordWrong = 'PasswordWrong';
    type TeamLeaderNotFound = 'TeamLeaderNotFound';

    // type Failed =
    //   | MissingField
    //   | LoginNeeded
    //   | Forbidden
    //   | UsernameExists
    //   | VerifyCodeNotFound
    //   | PasswordWrong
    //   | TeamLeaderNotFound;

    type Success = 'Success';
  }

  type FileID = string;
  type Time = string;
  // type TShirtSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';

  // User
  namespace User {
    // POST /v1/user/reg
    interface RegisterRequest {
      username: string;
      password: string;
      email: string;
    }

    type RegisterResponse =
      | NoDataResponse<400, Message.MissingField>
      | NoDataResponse<400, Message.UsernameExists>
      | NoDataResponse<200, Message.Success>;

    // POST /v1/user/reg_verify
    interface VerifyRegRequest {
      code: string;
    }

    type VerifyRegResponse =
      | NoDataResponse<400, Message.MissingField>
      | NoDataResponse<400, Message.VerifyCodeNotFound>
      | NoDataResponse<200, Message.Success>;

    // POST /v1/user/login
    interface LoginRequest {
      username: string;
      password: string;
    }

    type LoginResponse =
      | NoDataResponse<400, Message.MissingField>
      | NoDataResponse<400, Message.UsernameExists>
      | Response<200, Message.Success, { token: string }>;

    // POST /v1/user/login
    interface DetailRequest {
      name: string;
      gentle: string;
      birthday: string;
      phone: string;
      resume: FileID;
      tShirtSize: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
      city: string;
      alipay: string;
      school: string;
      college: string;
      grade: string;
      graduateTime: Time; // 年月日
      urgentConcat: {
        name: string;
        phone: string;
        relationship: string;
      };

      workSet?: FileID;
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

    type DetailResponse =
      | NoDataResponse<400, Message.MissingField>
      | NoDataResponse<400, Message.TeamLeaderNotFound>
      | NoDataResponse<200, Message.Success>;

    type ChangeDetailResponse =
      | NoDataResponse<400, Message.MissingField>
      | NoDataResponse<400, Message.TeamLeaderNotFound>
      | Response<200, Message.Success, Partial<DetailRequest>>;
  }

  interface ReqWithAuth<P, M, T> extends ReqWithoutAuth<P, M, T> {
    headers: { Authorization: string };
  }

  interface ReqWithoutAuth<P, M, T> {
    endpoint: P;
    methods: M;
    body: T;
  }

  // prettier-ignore
  interface RequestFunc {
    (req: ReqWithoutAuth<'/v1/user/reg', 'POST', User.RegisterRequest>): User.RegisterResponse;
    (req: ReqWithoutAuth<'/v1/user/reg_verify', 'POST', User.VerifyRegRequest>): User.VerifyRegResponse;
    (req: ReqWithoutAuth<'/v1/user/login', 'POST', User.LoginRequest>): User.LoginResponse;

    (req: ReqWithAuth<'/v1/user/detail', 'POST', User.DetailRequest>): User.DetailResponse;
    (req: ReqWithAuth<'/v1/user/detail', 'PUT', Partial<User.DetailRequest>>): User.ChangeDetailResponse;
    // (req: ReqWithAuth<'/v1/user/pwd', 'PUT', { password: string }>): User.RegisterResponse;
  }
}
