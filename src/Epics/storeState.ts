import store from '../redux/store';

export const getUserStateList = () => {
    const state = store.getState();
    return state.admin.userState.value;
};

export const getAuthLoggedIn = () => {
    const state = store.getState();
    return state.auth.loggedIn;
};

export const getUserTeamId = () => {
    const state = store.getState();
    return state.user.teamId;
};

export const getIsDetailedSubmitted = () => {
    const state = store.getState();
    return state.user.isDetailFormSubmitted;
};

export const getPermission = () => {
    const state = store.getState();
    return state.user.permission !== 0;
};

export const getMsgData = () => {
    const state = store.getState();
    return state.msgData;
};

export const getUserInfo = () => {
    const state = store.getState();
    return state.user;
};

export const getLoginForm = () => {
    const state = store.getState();
    return state.loginForm;
};

export const getRegisterForm = () => {
    const state = store.getState();
    return state.registerForm;
};

export const getResetPwdForm = () => {
    const state = store.getState();
    return state.resetPwdForm;
};

export const getDetailedForm = () => {
    const state = store.getState();
    return state.detailForm;
};

export const getNewTeamForm = () => {
    const state = store.getState();
    return state.newTeamForm;
};

export const getJoinTeamForm = () => {
    const state = store.getState();
    return state.joinTeamForm;
};

export const getTeamId = () => {
    const state = store.getState();
    return state.user.teamId;
};
