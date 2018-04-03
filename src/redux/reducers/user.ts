export type UserData = Partial<{
  username: string;
  phone: string;
  name: string | null;
  // 详情是否提交
  isDetailFormSubmitted: boolean;
  // 组队信息是否提交
  // applied: boolean;
  isAdmin: boolean;
  // 一定已注册了
  registrered: true;
  teamId: string | null;
  // (applied && isAccepted === null) 意味着是 pending 状态
  isAccepted: boolean | null;
  confirmed: boolean | null;
  checkedIn: boolean | null;
  projectId: string | null;
  awardId: string | null;
  // 报销: 0: 不需要报销但是已经确认报销数据  null: 未进行到报销流程, 其他数字: 报销金额
  reimbursement: number | null;
  awardMoneyGiven: boolean | null;
  awardItemGiven: boolean | null;
  invoiceRevived: boolean | null;
}>;

export default function auth(state: UserData = {}, action: { type: string; payload?: UserData }) {
  switch (action.type) {
    case 'SET_USER_INFO':
      return {
        ...state,
        ...(action.payload || {}),
      };
    default:
      return state;
  }
}
