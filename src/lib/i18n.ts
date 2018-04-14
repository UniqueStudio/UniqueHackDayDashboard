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
  PhoneInvalid:        ['电话号码不合法','Invalid phone number'][language],
  CodeNotMatch:        ['验证码不匹配','Authentication code mismatch'][language],
  TeamNameExists:      ['队伍名已存在','Team name already exists'][language],
  AlreadyTeamedUp:     ['你已加入其他队伍','You have joined other teams'][language],
  RequestTooOften:     ['请求过于频繁','Request too often'][language],
  PasswordInvalid:     ['密码不合法','Invalid password'][language],
  TShirtSizeInvalid:   ['T-Shirt 尺寸不合法','Invalid T-Shirt size'][language],
  FileIdInvalid:       ['客户端错误','Client Error'][language],
  EmailInvalid:        ['邮箱不合法','Email is not valid'][language],
  BadJson:             ['客户端错误','Client error'][language],
  UsernameExists:      ['用户名已存在','Username already exists'][language],
  PhoneExists:         ['手机号已经被注册','Phone number has been registered'][language],
  EmailExists:         ['邮箱已经被使用','Email number has been used'][language],
  PhoneNotExists:      ['手机号未注册','Phone number haven\'t been registered'][language],
  TeamNotExists:       ['队伍不存在','Team does not exist'][language],
  VerifyCodeNotFound:  ['验证码正确','Correct'][language],
  TeamLeaderNotFound:  ['队长未找到','Team-Leader not found'][language],
  Forbidden:           ['你无法进行此操作','Illegal action'][language],
  TeamFull:            ['队伍已满','Team is full'][language],
  ApplyNeeded:         ['您还未填写报名信息','You haven\'t filled in the registration information'][language],
  Success:             ['操作成功','Operation succeed'][language],
  // alreadyTeamedUp: ['你已加入其他队伍',""][language],
};

// prettier-ignore
const reqTips = {
  LOGIN_FAILED:          ['登录失败', 'Login failed'][language],
  REGISTER_FAILED:       ['注册失败', 'Register failed'][language],
  SEND_SMS_FAILED:       ['短信发送失败','Send SMS failed'][language],
  LOAD_DETAIL_FAILED:    ['加载详情表单失败','Failed to load details form'][language],
  LOAD_INFO_FAILED:      ['加载用户信息失败','Failed to load user information'][language],
  RESET_PWD_FAILED:      ['重置密码失败','Reset Password Failed'][language],
  CHANGE_IS_T_FAILED:    ['确认组队情况失败','Failed to confirm team status'][language],
  CREATE_TEAM_FAILED:    ['新建队伍失败','Failed to create a new team'][language],
  GET_TEAM_INFO_FAILED:  ['获取队伍信息失败','Failed to get team info'][language],
  JOIN_TEAM_FAILED:      ['加入队伍失败', 'Failed to join the team'][language],
  SUBMIT_DETAIL:         ['提交详情失败', 'Failed to submit details'][language],
  MSG_POLL_FAILED:       ['拉取新消息失败', 'Failed to pull new message'][language],
  GET_UNREAD_MSG_ALL:    ['拉取未读消息失败', 'Failed to fetch unread message'][language],
  SET_MSG_READ:          ['设为已读失败', 'Failed to set as read'][language],
  DELETE_MSG:            ['删除消息失败', 'Failed to delete message'][language],
  CONFIRM_APPLY:         ['确认报名失败', 'Failed to confirm apply'][language],
  DELETE_TEAM_MEMBER:    ['移除队员失败', 'Failed to remove team member'][language],
  DELETE_TEAM:           ['解散队伍失败', 'Failed to dessolute team'][language],
  CHANGE_TEAM_LEADER:    ['更改队长失败', 'Failed to transfer teamleader'][language]
};

// prettier-ignore
const messageTitles: Pick<{ [k: string]: string }, API.Message.MessageType> = {
  LoginElseWhere:      ['被迫下线', 'Logged Out Forcely'][language],
  NewTeammate:         ['您有了新的队友', 'New Teammate'][language],
  TeamCreated:         ['队伍已创建', 'Team Created'][language],
  TeamJoined:          ['已加入队伍', 'Team Joined'][language],
  ApplyComplete:       ['报名成功', 'Apply Succeed'][language],
  ApplyNeedsConfirm:   ['需要确认参赛', 'Confirm Your Participation'][language],
  ApplyConfirmed:      ['参赛已确认', 'Participation Confirmed'][language],
  ApplyCanceled:       ['参赛已取消', 'Participation Canceled'][language],
  HackExited:          ['已退出比赛', 'Hackday Exited'][language],
  Accepted:            ['您的报名申请已通过审核', 'Accepted'][language],
  Rejected:            ['您的报名申请未通过审核', 'Rejected'][language],
  OtherMessage:        '%s',
};

const messageValues: Pick<{ [k: string]: string }, API.Message.MessageType> = {
  LoginElseWhere: [
    '您的账号在其他客户端登录，此客户端被迫下线。',
    'Your account logged in on other client, you logged out on this client.',
  ][language],
  NewTeammate: [
    '新的队友 %s，用户名：%s 已经加入你的队伍，前往“队伍信息”界面进行确认。',
    `A new teammate '%s' whose username is '%s' has joined your team, go to 'Team Info' for confirmation.`,
  ][language],
  TeamCreated: ['队伍已创建', 'Team Created'][language],
  TeamJoined: ['已加入队伍', 'Team Joined'][language],
  ApplyComplete: ['报名成功', 'Apply Succeed'][language],
  ApplyNeedsConfirm: ['需要确认参赛', 'Confirm Your Participation'][language],
  ApplyConfirmed: ['参赛已确认', 'Participation Confirmed'][language],
  ApplyCanceled: ['参赛已取消', 'Participation Canceled'][language],
  HackExited: ['已退出比赛', 'Hackday Exited'][language],
  Accepted: ['您的报名申请已通过审核', 'Accepted'][language],
  Rejected: ['您的报名申请未通过审核', 'Rejected'][language],
  OtherMessage: '%s',
};

const locales = {
  // messages for reponse message field
  ...messages,
  // tips after request failed
  ...reqTips,
  messageTitles,
  messageValues,
};

export default locales;
