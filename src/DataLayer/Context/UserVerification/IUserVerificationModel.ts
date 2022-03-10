import mongoose from 'mongoose';
import { IUserVerificationAttrs } from './IUserVerificationAttr';
import { IUserVerificationDoc } from './IUserVerificationDock';

export interface IUserVerificationModel extends mongoose.Model<IUserVerificationDoc> {
    build(UserRoleAttrs: IUserVerificationAttrs): IUserVerificationDoc;
}
