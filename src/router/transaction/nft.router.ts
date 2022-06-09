
import express from 'express';
import tranactionController from '../../Controllers/Transaction/TransactionController';

const transaction = express.Router();


transaction.get('/getAll',
    tranactionController.GetAllNFTs);


export default transaction;