import OperationResult from "../../../core/Operation/OperationResult";

export interface ITransaction {

    getAllTransactons(fromBlock: string, toBlock: string, walletAddress: string): Promise<OperationResult<any>>;
}