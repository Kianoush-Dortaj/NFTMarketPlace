import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { INFTAttrs } from './INFTAttr';
import { INFTDoc } from './INFTDock';
import { INFTModel } from './INFTModel';

const NFTSchema = new mongoose.Schema({
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    network: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tokenId: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    toJSON: { virtuals: true },
})

NFTSchema.statics.build = (attrs: INFTAttrs) => {
    return new NFTEntitie(attrs);
}

const NFTEntitie = mongoose.model<INFTDoc, INFTModel>("NFT", NFTSchema);

export { NFTEntitie }