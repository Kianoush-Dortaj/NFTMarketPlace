import { INFT } from './INFT';
import OperationResult from "../../../core/Operation/OperationResult";
import { InternalServerError } from '../../../core/ErrorHandler/DatabaseConectionError';
import { NFTEntitie } from '../../Context/NFT/NFT';
import { CreateNFTModel } from '../../../DTO/NFT/create-nft';
import { ContractConfig } from '../../../utiles/contract/contract-config';

export class NFT implements INFT {


    public async CreateNFT(item: CreateNFTModel): Promise<OperationResult<any>> {

        try {

            const createNFT = await ContractConfig.CreateMarket(item.price, item.file);
            if (!createNFT.result) {
                return OperationResult.BuildFailur(createNFT.message);
            }

            const nft = await NFTEntitie.build({
                createdBy: item.createdBy,
                description: item.description,
                image: createNFT.result.imageUrl,
                network: item.network,
                owner: item.owner,
                price: item.price,
                title: item.title,
                tokenId: createNFT.result.tokenId
            });

            nft.save();

            return OperationResult.BuildSuccessResult("", true);

        } catch (error: any) {
            throw new InternalServerError(error.message);
        }
    }

}