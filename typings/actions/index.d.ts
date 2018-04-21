declare namespace Actions {
  type JsonWebToken = string;

  namespace ActionTypes {

  }
  namespace ErrorMessage {
    enum Login {
      UsernameNotFound = 'UsernameNotFound',
      PasswordWrong = 'PasswordWrong',
    }
  }
  interface LoginSubmitAction {
    type: 'LOGIN';
    payload: {
      usernameOrPhone: string;
      password: string;
    };
  }

  interface LoginOKAction {
    type: 'LOGIN_OK';
    payload: JsonWebToken;
  }

  interface LoginFailAction {
    type: 'LOGIN_Fail';
    payload: ErrorMessage.Login;
  }

  type LoginAction = LoginSubmitAction | LoginOKAction | LoginFailAction;

  type Action = LoginAction;
}
