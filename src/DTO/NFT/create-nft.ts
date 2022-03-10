
export interface CreateNFTModel {
    createdBy: string;
    network: string;
    title: string;
    description: string;
    file:any;
    price: string;
    owner?: string;
}