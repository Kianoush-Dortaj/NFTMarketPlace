import mongoose from 'mongoose';
import { INFTAttrs } from './INFTAttr';
import { INFTDoc } from './INFTDock';

export interface INFTModel extends mongoose.Model<INFTDoc> {
    build(NftItems: INFTAttrs): INFTDoc;
}
