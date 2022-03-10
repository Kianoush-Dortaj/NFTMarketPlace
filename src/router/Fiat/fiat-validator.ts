
// import { body, check, param, query } from "express-validator";
// import unitofWotk from '../../DataLayer/Repository/UnitOfWork/UnitOfWork';

// export default new class PaymentGetwayValidation {

//     PayHandle() {
//         return [

//             check("fiatCurrenctId").custom(async (value, { req }) => {
//                 if (req.params) {

//                     let data = await unitofWotk.FiatCurrency
//                         .GetByIdFiatCurrency(value);

//                     if (data.result?.currencyCode !== req.body.currency) {
//                         return Promise.reject(
//                             "Your Currency Selected not Equal to Selected Currecy"
//                         );
//                     }

//                     if (!data.success) {
//                         return Promise.reject(
//                             "We Can not Find this Record , Please try again"
//                         );
//                     }
//                 }
//             })
//         ];
//     }

// }
