export interface GetAllCryptoModel {

    cryptoCurrencyMap: CryptoCurrencyMapModel[];

}

export interface CryptoCurrencyMapModel {
    id: number;
    name: string;
    symbol: string;
    slug: string;
    is_active: number;
    status: string;
    rank: number;
}