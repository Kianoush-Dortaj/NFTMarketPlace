import { ExchangeRoadMap } from "./ExchangeRoadMap";

export interface ResultCalcualteFiatToCrypto {
    networkComission: string;
    comission: number;
    remaningAmount: string;
    currencyPrice: string;
    networkId: string;
    amount: number;
    exchange: string;
    coinId: string,
    expireTime: number;
    fiatAssetId: string;
    result: number;
    calculateId: string;
    currency: string;
    roadMap: ExchangeRoadMap[];
}