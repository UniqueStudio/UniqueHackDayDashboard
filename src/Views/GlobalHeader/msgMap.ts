import { INoticeIconData } from 'ant-design-pro/es/NoticeIcon/NoticeIconTab';
import originGenIconImage, { IconType } from '../../lib/genIconImage';
import memoize from 'lodash-es/memoize';
import { SingleMessage } from '../../redux/reducers/msg';

import locales from '../../lib/i18n';
import { replace } from 'react-router-redux';
import { noop } from 'redux-saga/utils';

function fmtString(str: string, ...params: string[]) {
  if (params.length === 0) {
    return str;
  }
  let i = 0;
  while (str.indexOf('%s') >= 0) {
    str = str.replace('%s', params[i++]);
  }
  return str;
}

const genIconImage = memoize(originGenIconImage);

export default function msgMap(msg: SingleMessage): INoticeIconData {
  const datetime = new Date(msg.time * 1000).toLocaleString();
  switch (msg.type) {
    case 'LoginElseWhere':
      return {
        id: msg.id,
        avatar: genIconImage(IconType.ExclamationCircle, 'red'),
        title: locales.messageTitles.LoginElseWhere,
        description: locales.messageValues.LoginElseWhere,
        datetime,
        read: msg.read,
        clickHandler: noop,
      } as any;
    case 'NewTeammate':
      const teammate = msg.newTeammateInfo;
      return {
        id: msg.id,
        avatar: genIconImage(IconType.QuestionCircle, '#FFAF40'),
        title: locales.messageTitles.NewTeammate,
        description: fmtString(locales.messageValues.NewTeammate, teammate.name, teammate.username),
        datetime,
        read: msg.read,
        clickHandler: (dispatch: any) => dispatch(replace('/team')),
      } as any;
    case 'Accepted':
      return {
        id: msg.id,
        avatar: genIconImage(IconType.CheckCircle, 'green'),
        title: locales.messageTitles.Accepted,
        description: locales.messageValues.Accepted,
        datetime,
        read: msg.read,
        clickHandler: noop,
      } as any;
    case 'Rejected':
      return {
        id: msg.id,
        avatar: genIconImage(IconType.CloseCircle, 'red'),
        title: locales.messageTitles.Rejected,
        description: locales.messageValues.Rejected,
        datetime,
        read: msg.read,
        clickHandler: noop,
      } as any;
    default:
      return {};
  }
}
