import { ExchangeRoadMap } from '../FiatToCrypto/ExchangeRoadMap';


export interface CalcualteFiatToFiatExchagneComissionResult {

    amount: number;
    fromAssetCurrencyCode: string;
    ToAssetCurrencyCode: string;
    comission: string;
    comissionPercent: string;
    remaningToAssetFroCalcualte: string;
    result: number;
    roadMap? : ExchangeRoadMap[];
}

