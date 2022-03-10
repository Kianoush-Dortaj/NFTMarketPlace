
import mongoose from 'mongoose';

export default interface IUserSettingDoc extends mongoose.Document {
    userId:any;
    value: string;
}
