import OperationResult from "../../../core/Operation/OperationResult";
import { CreateNFTModel } from "../../../DTO/NFT/create-nft";

export interface INFT {
    CreateNFT(item: CreateNFTModel): Promise<OperationResult<any>>
}