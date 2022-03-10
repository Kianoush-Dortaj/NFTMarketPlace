
import mongoose from 'mongoose';
import ISettingAttr from './IUserSettingAttr';
import ISettingDoc from './IUserSettingDoc';

export interface IUserSettingModel extends mongoose.Model<ISettingDoc> {
    build(roleAttrs: ISettingAttr): ISettingDoc;
}