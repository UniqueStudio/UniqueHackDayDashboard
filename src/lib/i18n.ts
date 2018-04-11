let language = 0;

export function setLanguage(lang: number) {
  language = lang;
}

// prettier-ignore
const messages: Pick<{ [k: string]: string }, API.Message> = {
  LoginNeeded:         ['你需要登录','Login needed'][language],
  PasswordWrong:       ['密码错误','Wrong password'][language],
  UserNotFound:        ['用户名不存在','Username does not exist'][language],
  UsernameInvalid:     ['用户名不合法','Invalid Username'][language],
  NetworkError:        ['网络错误','Network error'][language],
  InternalServerError: ['服务器错误','Server error'][language],
  MissingField:        ['客户端错误','Client error'][language],
  HumanCheckFailed:    ['你可能是网络机器人，请重试','You might be a robot, please try again'][language],
  PhoneInvalid:        ['电话号码不合法',"Invalid phone number"][language],
  CodeNotMatch:        ['验证码不匹配',"Authentication code mismatch"][language],
  TeamNameExists:      ['队伍名已存在',"Team name already exists"][language],
  AlreadyTeamedUp:     ['你已加入其他队伍',"You have joined other teams"][language],
  RequestTooOften:     ['请求过于频繁',"Request too often"][language],
  PasswordInvalid:     ['密码不合法',"Invalid password"][language],
  TShirtSizeInvalid:   ['T-Shirt 尺寸不合法',"Invalid T-Shirt size"][language],
  FileIdInvalid:       ['客户端错误',"Client Error"][language],
  EmailInvalid:        ['邮箱不合法',"Email is not valid"][language],
  BadJson:             ['客户端错误',"Client error"][language],
  UsernameExists:      ['用户名已存在',"Username already exists"][language],
  PhoneExists:         ['手机号已经被注册了',"Phone number has been registered"][language],
  PhoneNotExists:      ['手机号未注册',"Phone number haven't been registered"][language],
  TeamNotExists:       ['队伍不存在',"Team does not exist"][language],
  VerifyCodeNotFound:  ['验证码正确',"Correct"][language],
  TeamLeaderNotFound:  ['队长未找到',"Captain not found"][language],
  Forbidden:           ['你无法进行此操作',"Illegal action"][language],
  TeamFull:            ['队伍已满',"Team is full"][language],
  ApplyNeeded:         ['您还未填写报名信息',"You haven't filled in the registration information"][language],
  Success:             ['操作成功',"Operation succeed"][language],
  // alreadyTeamedUp: ['你已加入其他队伍',""][language],
};

// prettier-ignore
const reqTips = {
  LOGIN_FAILED:          ['登录失败', 'Login failed'][language],
  REGISTER_FAILED:       ['注册失败', 'Register failed'][language],
  SEND_SMS_FAILED:       ['短信发送失败',"Send SMS failed"][language],
  LOAD_DETAIL_FAILED:    ['加载详情表单失败',"Failed to load details form"][language],
  LOAD_INFO_FAILED:      ['加载用户信息失败',"Failed to load user information"][language],
  RESET_PWD_FAILED:      ['重置密码失败',"Reset Password Failed"][language],
  CHANGE_IS_T_FAILED:    ['确认组队情况失败',"Failed to confirm team status"][language],
  CREATE_TEAM_FAILED:    ['新建队伍失败',"Failed to create a new team"][language],
  GET_TEAM_INFO_FAILED:  ['获取队伍信息失败',"Failed to get team info"][language],
  JOIN_TEAM_FAILED:      ['加入队伍失败',"Failed to join the team"][language],
  SUBMIT_DETAIL:         ['提交详情失败',"Failed to submit details"][language],
  MSG_POLL_FAILED:       ['拉取新消息失败',"Failure to pull new message"][language],
  GET_UNREAD_MSG_ALL:    ['拉取未读消息失败',"Failure to fetch unread message"][language],
  SET_MSG_READ:          ['设为已读失败',"Failure to set as read"][language],
  DELETE_MSG:            ['删除消息失败',"Failure to delete message"][language],
};

const locales = {
  // messages for reponse message field
  ...messages,
  // tips after request failed
  ...reqTips,
};

export default locales;
