import db from '../index';
import UserSchema from './user/index';

export const User = db.model('User', UserSchema);
