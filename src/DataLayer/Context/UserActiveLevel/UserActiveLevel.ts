import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { IUserActiveLevelAttrs } from './IUserActiveLevelAttr';
import { IUserActiveLevelDoc } from './IUserActiveLevelDock';
import { IUserActiveLevelModel } from './IUserActiveLevelModel';

const UserActiveLevelSchema = new mongoose.Schema({
    userLevel: {
        type: Schema.Types.ObjectId,
        ref: 'UserLevel',
        required: true
    },
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
}, {
    toJSON: { virtuals: true },
})

// UserActiveLevelSchema.plugin(BaseSchema);

UserActiveLevelSchema.statics.build = (attrs: IUserActiveLevelAttrs) => {
    return new UserActiveLevelEntitie(attrs);
}


const UserActiveLevelEntitie = mongoose.model<IUserActiveLevelDoc, IUserActiveLevelModel>("UserActiveLevel", UserActiveLevelSchema);

export { UserActiveLevelEntitie }