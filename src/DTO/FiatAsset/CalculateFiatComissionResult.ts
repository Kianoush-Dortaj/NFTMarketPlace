import { ExchangeRoadMap } from "../FiatToCrypto/ExchangeRoadMap";

export interface CalculateFiatComissionResult {
    calculateId: string;
    fromAmount: number;
    toAmount: number;
    fromCurrencyCode: string;
    toCurrencyCode: string;
    fromId: string;
    toId: string;
    result: number;
    roadMap?: ExchangeRoadMap[];
}