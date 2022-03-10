import mongoose from 'mongoose';
import { IUserAttrs } from './IUserAttr';
import { IUserDoc } from './IUserDock';

export interface IUserModel extends mongoose.Model<IUserDoc> {
    build(userAttrs: IUserAttrs): IUserDoc;
}
