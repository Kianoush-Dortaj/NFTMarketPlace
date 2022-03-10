import mongoose from 'mongoose';

export interface INFTDoc extends mongoose.Document {
    createdBy: any;
    network: any;
    tokenId:number;
    title: string;
    description: string;
    image: string;
    price: string;
    owner: any;
}