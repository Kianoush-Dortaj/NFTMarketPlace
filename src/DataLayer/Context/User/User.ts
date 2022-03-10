import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import uniqueString from 'unique-string';
import { IUserAttrs } from './IUserAttr';
import { IUserDoc } from './IUserDock';
import { IUserModel } from './IUserModel'

const UserSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    phoneNumber: { type: String, require: false },
    email: { type: String, defult: null },
    gender: { type: Number, require: false },
    isAdmin: { type: Boolean, require: true, default: false },
    isActive: { type: Boolean, default: false },
    isSupport: { type: Boolean, default: false },
    poster: { type: String },
    confirmEmail: { type: Boolean, default: false },
    confirmPhoneNumber: { type: Boolean, default: false },
    towFactorEnabled: { type: Boolean, default: false },
    avatar: { type: String },
    userRole: {
        type: Schema.Types.ObjectId,
        ref: 'UserRole',
        require: false
    },
    userLevel: {
        type: Schema.Types.ObjectId,
        ref: 'UserLevel',
    },
    birthDate: { type: Date },
    locked: { type: Boolean, default: false },
    lockedDate: { type: Date, default: null },
    accountFail: { type: Number, default: 0 },
    password: { type: String, require: true },
    securityStamp: { type: String },
}, {
    toJSON: { virtuals: true },
})


UserSchema.pre('updateOne', function () {
    this.set({ securityStamp: uniqueString() });
});

UserSchema.statics.build = (attrs: IUserAttrs) => {
    return new UserEntite(attrs);
}


const UserEntite = mongoose.model<IUserDoc, IUserModel>("User", UserSchema);

export { UserEntite }