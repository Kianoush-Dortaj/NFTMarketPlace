export interface ExchangeRoadMap {
    from: string;
    to: string;
    amount?: number | string;
    amountbeforCalcualteComission?: number | string;
    amountafterExhcnange?: number | string;
    amountafterCalcualteComission?: number | string;
    amountafterCalcualteGasPrice?: number | string;
    currencyPrice?: number | string;
    amountafterCalculate?: number | string;
    gasPrice?: number | string;
    comissionPercent?: number;
    exchangeRate?: number | string;
}