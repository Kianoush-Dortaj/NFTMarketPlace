
export interface GetFiatCurrencyInfoModel {
    id: string;
    name: string;
    isPublish: boolean;
    displayOrder:number;
    currencyCode: string;
    logo?: string;

}