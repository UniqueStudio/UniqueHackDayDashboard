export default function messageMap(message: API.Message) {
  if (message === 'LoginNeeded') {
    return '你需要登录!';
  }

  if (message === 'PasswordWrong') {
    return '密码错误!';
  }

  if (message === 'UserNotFound') {
    return '用户不存在!';
  }

  if (message === 'UsernameInvalid') {
    return '用户名无效!';
  }

  return '未知消息';
}
