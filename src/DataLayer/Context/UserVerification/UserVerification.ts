import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { IUserVerificationAttrs } from './IUserVerificationAttr';
import { IUserVerificationDoc } from './IUserVerificationDock';
import { IUserVerificationModel } from './IUserVerificationModel';

const UserVerificationSchema = new mongoose.Schema({

    birthDate: {
        type: Date,
        require: true
    },
    nationality: {
        type: Schema.Types.ObjectId, required: true, ref: 'Country'
    },
    typeVerification: {
        type: Number,
        require: true
    },
    image: {
        type: String,
        require: false
    },
    selfieImage: {
        type: String,
        require: false
    },
    frontImage: {
        type: String,
        require: false
    },
    backImage: {
        type: String,
        require: false
    },
    createdAt: {
        type: Date,
        require: true
    },
    description: {
        type: String,
        require: false
    },
    updateAt: {
        type: Date,
        require: false
    },
    status: {
        type: Number,
        require: true
    },
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
}, {
    toJSON: { virtuals: true },
});



UserVerificationSchema.pre("save", async function () {
    this.set({ createdAt: new Date });
});


UserVerificationSchema.pre('updateOne', function () {
    this.set({ updateAt: new Date });
});


UserVerificationSchema.statics.build = (attrs: IUserVerificationAttrs) => {
    return new UserVerificationEntitie(attrs);
}


const UserVerificationEntitie = mongoose.model<IUserVerificationDoc, IUserVerificationModel>("UserVerification", UserVerificationSchema);

export { UserVerificationEntitie }