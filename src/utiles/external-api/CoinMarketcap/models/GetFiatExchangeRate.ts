


export interface GetFiatExchangeRateModel {
    data: FiatExchangeRateData,
    status: Status;
}

interface Status {
    timestamp: string;
    error_code: string;
    error_message: string;
    elapsed: string;
    credit_count: number;
}

interface FiatExchangeRateData {
    symbol: string;
    id: string;
    name: string;
    amount: number;
    last_updated: number;
    quote: FiatExchangeRateDataQuote[];
}

interface FiatExchangeRateDataQuote {
    cryptoId: number;
    symbol: string;
    price: number;
    lastUpdated: number;
}