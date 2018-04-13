import { INoticeIconData } from 'ant-design-pro/es/NoticeIcon/NoticeIconTab';
import originGenIconImage, { IconType } from '../../lib/genIconImage';
import memoize from 'lodash-es/memoize';
import { SingleMessage } from '../../redux/reducers/msg';

const genIconImage = memoize(originGenIconImage);

export default function msgMap(msg: SingleMessage): INoticeIconData {
  const datetime = new Date(msg.time * 1000).toLocaleString();
  if (msg.type === 'LoginElseWhere') {
    return {
      avatar: genIconImage(IconType.ExclamationCircle, 'red'),
      title: '异地登陆提醒',
      description: `你的账号已于 ${datetime} 发生异地登陆异常，请注意防范账号安全。`,
      datetime,
      read: msg.read,
    } as any;
  }

  return {};
}
