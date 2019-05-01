import request from './API';
import locales from './i18n';

export async function login(usernameOrPhone: string, password: string, antiRobotToken: string) {
  const res = await request({
    endpoint: '/v1/user/login',
    method: 'POST',
    body: {
      usernameOrPhone,
      password,
      antiRobotToken,
    },
  });
  if (res.httpStatusCode === 200) {
    return [res.data.token];
  }

  return [null, `${locales.LOGIN_FAILED}: ${locales[res.message]}`];
}
// prettier-ignore
export async function register(username: string, password: string, phone: string, code: string, antiRobotToken: string) {
  const res = await request({
    endpoint: '/v1/user/reg',
    method: 'POST',
    body: {
      username,
      password,
      phone,
      code,
      antiRobotToken,
    },
  });
  if (res.httpStatusCode === 200) {
    return [res.data.token];
  }

  return [null, `${locales.REGISTER_FAILED}: ${locales[res.message]}`];
}

export async function resetPwdRequest(
  phone: string,
  code: string,
  newPassword: string,
  antiRobotToken: string,
) {
  const res = await request({
    endpoint: '/v1/user/password?t=reset',
    method: 'POST',
    body: {
      phone,
      code,
      newPassword,
      antiRobotToken,
    },
  });
  if (res.httpStatusCode === 200) {
    return [true];
  }
  return [false, `${locales.RESET_PWD_FAILED}: ${locales[res.message]}`];
}

export async function registerSendSMS(phone: string, antiRobotToken: string) {
  const res = await request({
    endpoint: '/v1/user/send_sms?t=register',
    method: 'POST',
    body: {
      phone,
      antiRobotToken,
    },
  });
  if (res.httpStatusCode === 200) {
    return [true];
  }
  return [false, `${locales.SEND_SMS_FAILED}: ${locales[res.message]}`];
}

export async function resetPwdSendSMS(phone: string, antiRobotToken: string) {
  const res = await request({
    endpoint: '/v1/user/send_sms?t=reset',
    method: 'POST',
    body: {
      phone,
      antiRobotToken,
    },
  });
  if (res.httpStatusCode === 200) {
    return [true];
  }
  return [false, `${locales.SEND_SMS_FAILED}: ${locales[res.message]}`];
}

export async function getUserDetail() {
  const res = await request({
    endpoint: '/v1/user/info',
    method: 'GET',
  });
  if (res.httpStatusCode === 200) {
    return [res.data];
  }
  return [null, `${locales.LOAD_DETAIL_FAILED}: ${locales[res.message]}`];
}

export async function getUserInfo() {
  const res = await request({
    endpoint: '/v1/user/info',
    method: 'GET',
  });

  if (res.httpStatusCode === 200) {
    return [res.data];
  }
  return [null, `${locales.LOAD_INFO_FAILED}: ${locales[res.message]}`];
}

export async function changeIsT(submitted: boolean) {
  const res = await request({
    endpoint: '/v1/user/team_form_submit_status',
    method: 'POST',
    body: {
      submitted,
    },
  });
  if (res.httpStatusCode === 200) {
    return [true];
  }
  return [null, `${locales.CHANGE_IS_T_FAILED}: ${locales[res.message]}`];
}

export async function createTeam(teamName: string) {
  const res = await request({
    endpoint: '/v1/team/teams',
    method: 'POST',
    body: { name: teamName },
  });
  if (res.httpStatusCode === 200) {
    return [res.data.teamId];
  }
  return [null, `${locales.CREATE_TEAM_FAILED}: ${locales[res.message]}`];
}

export async function getTeamInfo(teamId: number) {
  const res = await request({
    endpoint: '/v1/team/info',
    method: 'GET',
    body: {
      teamId,
    },
  });

  if (res.httpStatusCode === 200) {
    return [res.data];
  }
  return [null, `${locales.GET_TEAM_INFO_FAILED}: ${locales[res.message]}`];
}

export async function joinTeam(teamLeaderName: string, teamLeaderPhone: string, username: string) {
  const getTeamIdRes = await request({
    endpoint: '/v1/team/id',
    method: 'GET',
    body: {
      teamLeaderName,
      teamLeaderPhone,
    },
  });

  if (getTeamIdRes.httpStatusCode === 200) {
    const joinTeamRes = await request({
      endpoint: '/v1/team/members',
      method: 'POST',
      body: {
        username,
        teamId: getTeamIdRes.data.teamId,
      },
    });

    if (joinTeamRes.httpStatusCode === 200) {
      return [getTeamIdRes.data.teamId];
    }
    return [null, `${locales.JOIN_TEAM_FAILED}: ${locales[joinTeamRes.message]}`];
  }
  return [null, `${locales.JOIN_TEAM_FAILED}: ${locales[getTeamIdRes.message]}`];
}

export async function submitDetail(detail: API.User.UserDetailRequest) {
  const res = await request({
    endpoint: '/v1/user/info',
    method: 'POST',
    body: detail,
  });
  if (res.httpStatusCode === 200) {
    return [true];
  }
  return [null, `${locales.SUBMIT_DETAIL}: ${locales[res.message]}`];
}

export async function msgPoll() {
  const res = await request({
    endpoint: '/v1/message/messages/new',
    method: 'GET',
  });
  if (res.httpStatusCode === 200) {
    return [res.data.messages];
  }
  return [null, `${locales.MSG_POLL_FAILED}: ${locales[res.message]}`];
}

export async function getUnreadMsgAll() {
  const res = await request({
    endpoint: '/v1/message/messages/all?filter=unread',
    method: 'GET',
  });
  if (res.httpStatusCode === 200) {
    return [res.data.messages];
  }
  return [null, `${locales.GET_UNREAD_MSG_ALL}: ${locales[res.message]}`];
}

export async function getReadMsgAll() {
  const res = await request({
    endpoint: '/v1/message/messages/all',
    method: 'GET',
  });
  if (res.httpStatusCode === 200) {
    return [res.data.messages];
  }
  return [null, `${locales.GET_UNREAD_MSG_ALL}: ${locales[res.message]}`];
}

export async function setMsgRead(id: number) {
  const res = await request({
    endpoint: '/v1/message/read_status',
    method: 'PUT',
    body: {
      id,
      status: 'read',
    },
  });
  if (res.httpStatusCode === 200) {
    return [true];
  }
  return [false, `${locales.SET_MSG_READ}: ${locales[res.message]}`];
}

export async function deleteMsg(id: number) {
  const res = await request({
    endpoint: '/v1/message/messages',
    method: 'DELETE',
    body: {
      id,
    },
  });
  if (res.httpStatusCode === 200) {
    return [true];
  }
  return [false, `${locales.DELETE_MSG}: ${locales[res.message]}`];
}

export async function confirmApply() {
  const res = await request({
    endpoint: '/v1/user/apply/confirmation',
    method: 'PUT',
    body: {
      confirmation: true,
    },
  });
  if (res.httpStatusCode === 200) {
    return [true];
  }
  return [false, `${locales.CONFIRM_APPLY}: ${locales[res.message]}`];
}

export async function abortConfirm() {
  const res = await request({
    endpoint: '/v1/user/confirm',
    method: 'DELETE',
  });
  if (res.httpStatusCode === 200) {
    return [true];
  }
  return [false, `${locales.ABORT_CONFIRMATION}: ${locales[res.message]}`];
}

export async function deleteTeamMember(username: string, teamId: number) {
  const res = await request({
    endpoint: '/v1/team/members',
    method: 'DELETE',
    body: {
      username,
      teamId,
    },
  });
  if (res.httpStatusCode === 200) {
    return [true];
  }
  return [false, `${locales.DELETE_TEAM_MEMBER}: ${locales[res.message]}`];
}

export async function deleteTeam(teamId: number) {
  const res = await request({
    endpoint: '/v1/team/teams',
    method: 'DELETE',
    body: {
      teamId,
    },
  });
  if (res.httpStatusCode === 200) {
    return [true];
  }
  return [false, `${locales.DELETE_TEAM}: ${locales[res.message]}`];
}

export async function changeTeamLeader(username: string, teamId: number) {
  const res = await request({
    endpoint: '/v1/team/leader',
    method: 'PUT',
    body: {
      username,
      teamId,
    },
  });
  if (res.httpStatusCode === 200) {
    return [true];
  }
  return [false, `${locales.DELETE_TEAM}: ${locales[res.message]}`];
}

export async function adminLoadUsersInfo() {
  const res = await request({
    endpoint: '/v1/admin/verify/teams',
    method: 'GET',
  });
  if (res.httpStatusCode === 200) {
    return [res.data.items];
  }
  return [null, 'admin: 加载用户消息失败'];
}

export async function adminUserStateChange(stateList: API.Admin.AdminUserState[]) {
  const res = await request({
    endpoint: '/v1/admin/verify/change',
    method: 'POST',
    body: { value: stateList },
  });
  if (res.httpStatusCode === 200) {
    return [true];
  }
  return [false, `admin: ${res.message}`];
}
