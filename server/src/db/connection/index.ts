import { MongoClient } from 'mongodb';

import { mongodbPath } from '../../../config';

// Use connect method to connect to the server
const clientPromise = MongoClient.connect(mongodbPath);

export default clientPromise;

// clientPromise
//   .then(client => {
//     console.log(client.db());
//   })
//   .catch(error => {
//     console.log(error);
//   });
