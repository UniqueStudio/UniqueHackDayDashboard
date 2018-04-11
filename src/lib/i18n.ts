let language = 0;

export function setLanguage(lang: number) {
  language = lang;
}

// prettier-ignore
const messages: Pick<{ [k: string]: string }, API.Message> = {
  LoginNeeded:         ['你需要登录'][language],
  PasswordWrong:       ['密码错误'][language],
  UserNotFound:        ['用户名不存在'][language],
  UsernameInvalid:     ['用户名不合法'][language],
  NetworkError:        ['网络错误'][language],
  InternalServerError: ['服务器错误'][language],
  MissingField:        ['客户端错误'][language],
  HumanCheckFailed:    ['你可能是网络机器人，请重试'][language],
  PhoneInvalid:        ['电话号码不合法'][language],
  CodeNotMatch:        ['验证码不匹配'][language],
  TeamNameExists:      ['队伍名已存在'][language],
  AlreadyTeamedUp:     ['你已加入其他队伍'][language],
  RequestTooOften:     ['请求过于频繁'][language],
  PasswordInvalid:     ['密码不合法'][language],
  TShirtSizeInvalid:   ['T-Shirt 尺寸不合法'][language],
  FileIdInvalid:       ['客户端错误'][language],
  EmailInvalid:        ['邮箱不合法'][language],
  BadJson:             ['客户端错误'][language],
  UsernameExists:      ['用户名已存在'][language],
  PhoneExists:         ['手机号已经被注册了'][language],
  PhoneNotExists:      ['手机号未注册'][language],
  TeamNotExists:       ['队伍不存在'][language],
  VerifyCodeNotFound:  ['验证码正确'][language],
  TeamLeaderNotFound:  ['队长未找到'][language],
  Forbidden:           ['你无法进行此操作'][language],
  TeamFull:            ['队伍已满'][language],
  ApplyNeeded:         ['您还未填写报名信息'][language],
  Success:             ['操作成功'][language],
  // alreadyTeamedUp: ['你已加入其他队伍'][language],
};

// prettier-ignore
const reqTips = {
  LOGIN_FAILED:          ['登录失败', 'Login failed'][language],
  REGISTER_FAILED:       ['注册失败', 'Register failed'][language],
  SEND_SMS_FAILED:       ['短信发送失败'][language],
  LOAD_DETAIL_FAILED:    ['加载详情表单失败'][language],
  LOAD_INFO_FAILED:      ['加载用户信息失败'][language],
  RESET_PWD_FAILED:      ['重置密码失败'][language],
  CHANGE_IS_T_FAILED:    ['确认组队情况失败'][language],
  CREATE_TEAM_FAILED:    ['新建队伍失败'][language],
  GET_TEAM_INFO_FAILED:  ['获取队伍信息失败'][language],
  JOIN_TEAM_FAILED:      ['加入队伍失败'][language],
  SUBMIT_DETAIL:         ['提交详情失败'][language],
  MSG_POLL_FAILED:       ['拉取新消息失败'][language],
  GET_UNREAD_MSG_ALL:    ['拉取未读消息失败'][language],
  SET_MSG_READ:          ['设为已读失败'][language],
  DELETE_MSG:            ['删除消息失败'][language],
  CONFIRM_APPLY:         ['确认报名'][language],
};

const locales = {
  // messages for reponse message field
  ...messages,
  // tips after request failed
  ...reqTips,
};

export default locales;
