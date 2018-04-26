import { MongoClient } from 'mongodb';

import { mongodbPath } from '../../../config';

// Use connect method to connect to the server
const clientPromise = MongoClient.connect(mongodbPath);

clientPromise.then(client => {
  const db = client.db();

  const users = db.collection('users');
  users.createIndex({ username: 1 }, { unique: true });
  users.createIndex({ phone: 1 }, { unique: true });
});

export default clientPromise;
