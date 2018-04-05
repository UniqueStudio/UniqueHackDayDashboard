import { INoticeIconData } from 'ant-design-pro/es/NoticeIcon/NoticeIconTab';
import { MsgDataSingle } from '../../redux/reducers/msg';
// import closeCircleO from '../../assets/icons/close-circle-o.svg';
// import error from '../../assets/icons/error.svg';
import exclamation from '../../assets/icons/exclamation-circle.svg';

export default function msgMap(msg: MsgDataSingle): INoticeIconData {
  const datetime = new Date(msg.time * 1000).toLocaleString();
  if (msg.type === 'LoginElseWhere') {
    return {
      avatar: exclamation,
      title: '异地登陆提醒',
      description: `你的账号已于 ${datetime} 发生异地登陆异常，请注意防范账号安全。`,
      datetime,
      read: !msg.unread,
    } as any;
  }

  return {};
}
