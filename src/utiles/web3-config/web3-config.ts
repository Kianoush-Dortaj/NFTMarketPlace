import Web3 from "web3";
export class TransactionWeb3 {

    static web3: Web3;

    static  async  Initialweb3() {
        TransactionWeb3.web3 = new Web3('HTTP://127.0.0.1:7545');
    }

}