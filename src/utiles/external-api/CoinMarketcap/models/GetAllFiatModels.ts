

export interface GetAllFiatModel {
    status: Status,
    data: GetCoinMrketCapFiatData[];
}

interface Status {
    timestamp: string;
    error_code: number;
    error_message: string;
    elapsed: number;
    credit_count: number;
    notice: string;
}

export interface GetCoinMrketCapFiatData {
    id: number;
    name: string;
    sign: string;
    symbol: string;
}