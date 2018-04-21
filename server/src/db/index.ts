import mongoose from 'mongoose';

import { mongodbPath } from '../../config';

mongoose.connect(mongodbPath);

const db = mongoose.connection;

export default db;
