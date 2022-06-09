
import { GetAllFiatModel, GetCoinMrketCapFiatData } from "./models/GetAllFiatModels";
import axios, { AxiosResponse } from "axios";
import { CryptoCurrencyMapModel, GetAllCryptoModel } from "./models/GetAllCryptoModel";
import OperationResult from "../../../core/Operation/OperationResult";
import { GetAllTransactionInfos } from "../../../DTO/transaction-infos/get-all-transaction-infos";

export class GetEtherScanInfo {


    private static urlGetAllFiatList = 'https://api.etherscan.io/api';

    static async getLoggsWithSpecialBlocks(fromBlock: string, toBlock: string, walletAddress: string): Promise<OperationResult<GetAllTransactionInfos[]>> {

        let urlGetAllCryptoList = `${this.urlGetAllFiatList}?module=logs&action=getLogs&fromBlock=${fromBlock}&toBlock=${toBlock}&address=${walletAddress}&apikey=XQAEKTAEFDBWPRQDZTGFV143XR552RVK1C`;

        let result: AxiosResponse = await axios.get(urlGetAllCryptoList);

        if (result.data.status == '1') {

            return OperationResult.BuildSuccessResult("", result.data.result);

        }

        return OperationResult.BuildFailur("we can not get Api List From Coin market cap . please try again");

    }

}