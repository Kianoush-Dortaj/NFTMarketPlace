import mongoose from 'mongoose';
import { ICloud } from './ICloud';

export default class MongooDbCloud implements ICloud {


    connect(): void {

        console.log('connect to Cloud')
    }


}