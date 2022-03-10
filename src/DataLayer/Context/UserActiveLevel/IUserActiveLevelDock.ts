import mongoose from 'mongoose';

export interface IUserActiveLevelDoc extends mongoose.Document {
    userLevel:any;
    userId: any;
}