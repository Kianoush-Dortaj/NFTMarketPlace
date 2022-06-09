import { Request, Response, NextFunction } from "express";
import { BaseController } from "../../core/Controller/BaseController";
import { InternalServerError } from "../../core/ErrorHandler/DatabaseConectionError";
import UnitOfWork from "../../DataLayer/Repository/UnitOfWork/UnitOfWork";

export default new class NFTController extends BaseController {

    constructor() {
        super();
    }

    async GetAllNFTs(req: Request, res: Response, next: NextFunction) {

        try {
            let validationData = await this.ValidationAction(req, res);

            if (!validationData.haveError) {

                const fromBlock = req.query.fromBlock;
                const toBlock = req.query.toBlock;
                const walletAddress = req.query.walletAddress;
                
                if (!fromBlock || !toBlock || !walletAddress) {
                    return this.BadRerquest(res, "fromBlock, toBlock and walletAddress are required");
                }

                const getAllNFTs = await UnitOfWork.TransactionInfo.getAllTransactons(fromBlock.toString(), toBlock.toString(), walletAddress.toString());

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

}