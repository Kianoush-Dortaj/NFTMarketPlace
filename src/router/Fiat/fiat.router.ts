
import express, { Express, Router, NextFunction, Request, Response } from 'express';
import middlware from './../../middleware/Authorization';
// import paymentGetwayController from '../../Controllers/PaymentGetwayController/PaymentController';
// import authController from './../../Utilities/Middllware/Authorization';
// import fiatAssetsController from '../../Controllers/FiatAssersController/FiatAssersController';
import fiatController from '../../Controllers/Fiat/FiatController';
// import fiatTocryptoController from '../../Controllers/FiatToCryptoController/FiatToCryptoController';

// import paymentGetwayValidator from './fiat-validator';

const fiat = express.Router();

// fiat.post('/deposit',
//     authController.AuthToken,
//     paymentGetwayValidator.PayHandle(),
//     paymentGetwayController.Payment);

fiat.get('/currencies',
    middlware.AuthToken,
    // paymentGetwayValidator.CreateHandle(),
    fiatController.GetAllFiatCurrencySelect);

// fiat.get('/assets',
//     authController.AuthToken,
//     // paymentGetwayValidator.CreateHandle(),
//     fiatAssetsController.GetByUserIdFiatAssets);

// fiat.get('/getById/:id',
//     authController.AuthToken,
//     // paymentGetwayValidator.CreateHandle(),
//     paymentGetwayController.GetByIdPaymentTransaction);

// fiat.get('/getUserTransactions',
//     authController.AuthToken,
//     // paymentGetwayValidator.CreateHandle(),
//     paymentGetwayController.GetByUserIdPaymentTransaction);

// fiat.post('/confirmTransfer',
//     authController.AuthToken,
//     // paymentGetwayValidator.CreateHandle(),
//     fiatAssetsController.TransferFromFiatAsset);

// fiat.post('/convertofiatcomission',
//     authController.AuthToken,
//     // paymentGetwayValidator.CreateHandle(),
//     fiatAssetsController.CalcualteFiatToFiatComission);

// fiat.post('/depositCrypto',
//     authController.AuthToken,
//     // paymentGetwayValidator.CreateHandle(),
//     fiatTocryptoController.CalcualteComissionFiatToCrypto);


export default fiat;