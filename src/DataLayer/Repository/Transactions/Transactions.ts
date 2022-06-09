import { InternalServerError } from "../../../core/ErrorHandler/DatabaseConectionError";
import OperationResult from "../../../core/Operation/OperationResult";
import { TransactionResult } from "../../../DTO/transaction-infos/transaction-result";
import { GetEtherScanInfo } from "../../../utiles/external-api/CoinMarketcap/GetFiatCoinMarketCap";
import { TransactionWeb3 } from "../../../utiles/web3-config/web3-config";
import { ITransaction } from "./ITransactions";


export class Transaction implements ITransaction {


    async getAllTransactons(fromBlock: string, toBlock: string, walletAddress: string): Promise<OperationResult<any>> {

        try {
            let model: TransactionResult[] = [];

            const getAll = await GetEtherScanInfo.getLoggsWithSpecialBlocks(fromBlock, toBlock, walletAddress);

            if (getAll.success) {
                const time = await TransactionWeb3.web3.eth.getBlock('400000');

                if (!getAll.result) {
                    return OperationResult.BuildSuccessResult("", getAll.message);

                }

                for (let index = 0; index < getAll.result.length; index++) {
                    const element = getAll.result[index];
                    model.push({
                        gasUsed: TransactionWeb3.web3.utils.fromWei(element.gasPrice,'ether') +' ' +'eth',
                        hash: element.transactionHash,
                        time: new Date(Number(time.timestamp) * 1000).toString(),
                        wallet: element.address,
                        blockNumber:TransactionWeb3.web3.utils.toDecimal(element.blockNumber),
                        value: TransactionWeb3.web3.utils.fromWei(element.data,'ether'),
                    })

                }
                return OperationResult.BuildSuccessResult("", model);

            } else {

                return OperationResult.BuildFailur(getAll.message);

            }

        } catch (error: any) {
            throw new InternalServerError(error.message);
        }

    }

}