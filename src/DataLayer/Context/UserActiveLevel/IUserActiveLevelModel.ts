import mongoose from 'mongoose';
import { IUserActiveLevelAttrs } from './IUserActiveLevelAttr';
import { IUserActiveLevelDoc } from './IUserActiveLevelDock';

export interface IUserActiveLevelModel extends mongoose.Model<IUserActiveLevelDoc> {
    build(UserRoleAttrs: IUserActiveLevelAttrs): IUserActiveLevelDoc;
}
