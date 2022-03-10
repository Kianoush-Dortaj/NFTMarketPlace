import mongoose from 'mongoose';
// abstract product
export interface IRegular {
    dataBaseConnection: mongoose.Connection | undefined;
    connect(): void;
}