import mongoose from 'mongoose';
// import { RequiredString, RequiredBoolean, RequiredNumber } from '../common/index';

const UserSchema = new mongoose.Schema({
  // username: RequiredString,
  // phone: RequiredString,
  // password: RequiredString,
  // isTeamFormSubmitted: RequiredBoolean,
  // isApplyConfirmed: RequiredBoolean,
  // adminLevel: RequiredNumber,
  // detail: {
  //   type: {
  //     name: String,
  //     gender: String,
  //     birthday: String,
  //     email: String,
  //     resume: Array,
  //     tShirtSize: String,
  //     city: String,
  //     alipay: String,
  //     school: String,
  //     major: String,
  //     grade: String,
  //     graduateTime: String, // 年月日
  //     urgentConcatName: String,
  //     urgentConcatPhone: String,
  //     urgentConcatRelationship: String,
  //     collection: Array,
  //     specialNeeds: String,
  //     github: String,
  //     linkedIn: String,
  //     codingDotNet: String,
  //     blog: String,
  //     roles: [String],
  //     skills: [String],
  //     hackdayTimes: Number,
  //     resumeToSponsor: Boolean,
  //     resumeForWork: Boolean,
  //   },
  //   required: false,
  // },
  // teamId: String,
  // // prizeId: String,
});

// console.log(UserSchema);

export default UserSchema;
