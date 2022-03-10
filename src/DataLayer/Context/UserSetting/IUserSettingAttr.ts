import mongoose from 'mongoose';

export default interface IUserSettingAttr extends mongoose.Document {
    userId:any;
    value: string;
}
