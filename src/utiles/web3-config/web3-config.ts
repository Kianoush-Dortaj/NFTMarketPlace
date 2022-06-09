import Web3 from "web3";
export class TransactionWeb3 {

    static web3: Web3;

    static  async  Initialweb3() {
        TransactionWeb3.web3 = new Web3('https://mainnet.infura.io/v3/1461728202954c07bd5ed5308641a054');
    }

}