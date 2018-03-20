export default function messageMap(message: API.Message) {
  if (message === API.Message.LoginNeeded) {
    return '你需要登录！';
  }

  if (message === API.Message.PasswordWrong) {
    return '密码错误';
  }

  if (message === API.Message.UserNotFound) {
    return '用户不存在';
  }

  if (message === API.Message.UsernameInvalid) {
    return '用户名无效';
  }

  return '未知消息';
}
