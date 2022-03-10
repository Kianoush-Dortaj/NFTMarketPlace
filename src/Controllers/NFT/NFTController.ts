import { Request, Response, NextFunction } from 'express';
import { BaseController } from "../../core/Controller/BaseController";
import { InternalServerError } from '../../core/ErrorHandler/DatabaseConectionError';
import { ContractConfig } from '../../utiles/contract/contract-config';

export default new class NFTController extends BaseController {

    constructor() {
        super();
    }

    async GetAllNFTs(req: Request, res: Response, next: NextFunction) {

        try {
            let validationData = await this.ValidationAction(req, res);

            if (!validationData.haveError) {

                const getAllNFTs = await ContractConfig.GetAllNFTs();

                if (getAllNFTs.success) {
                    return this.OkObjectResult(res, {
                        data: getAllNFTs.result
                    }, "");

                }
                next(new InternalServerError(getAllNFTs.message))

            } else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        } catch (error: any) {
            next(new InternalServerError(error.message))
        }

    }

    async GetAllMYBuyNFTs(req: Request, res: Response, next: NextFunction) {

        try {
            let validationData = await this.ValidationAction(req, res);

            if (!validationData.haveError) {

                const getAllNFTs = await ContractConfig.GetAllMYBuyNFTs();

                if (getAllNFTs.success) {
                    return this.OkObjectResult(res, {
                        data: getAllNFTs.result
                    }, "");

                }
                next(new InternalServerError(getAllNFTs.message))

            } else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        } catch (error: any) {
            next(new InternalServerError(error.message))
        }

    }

    async GetAllMYNFTs(req: Request, res: Response, next: NextFunction) {

        try {
            let validationData = await this.ValidationAction(req, res);

            if (!validationData.haveError) {

                const getAllNFTs = await ContractConfig.GetAllMYNFTs();

                if (getAllNFTs.success) {
                    return this.OkObjectResult(res, {
                        data: getAllNFTs.result
                    }, "");

                }
                next(new InternalServerError(getAllNFTs.message))

            } else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        } catch (error: any) {
            next(new InternalServerError(error.message))
        }

    }

    async ByNFT(req: Request, res: Response, next: NextFunction) {

        try {
            let validationData = await this.ValidationAction(req, res);

            if (!validationData.haveError) {

                const { nftPrice, tokenId } = req.body;

                const buyNft = await ContractConfig.ByNFT(tokenId, nftPrice);

                if (buyNft.success) {

                    return this.OkObjectResult(res, {
                        data: buyNft.result
                    },
                        "");

                }

                next(new InternalServerError(buyNft.message))

            } else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        } catch (error: any) {
            next(new InternalServerError(error.message))
        }

    }

    async CreateNFT(req: Request, res: Response, next: NextFunction) {

        try {
            let validationData = await this.ValidationAction(req, res);

            if (!validationData.haveError) {

                const { nftPrice, nftTokenId, file } = req.body;

                const createNFT = await ContractConfig.CreateMarket(nftPrice, nftTokenId, file);

                if (createNFT.success) {

                    return this.OkObjectResult(res, {
                        data: createNFT.result
                    },
                        "");

                }

                next(new InternalServerError(createNFT.message))

            } else {
                return this.BadRerquest(res, validationData.errorMessage.toString());
            }
        } catch (error: any) {
            next(new InternalServerError(error.message))
        }

    }

}