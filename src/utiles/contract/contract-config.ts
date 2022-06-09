import web3 from "web3";
import * as fs from 'fs';
import * as path from 'path';
import { ethers } from 'ethers';
import config from './../../Configs/index';
import OperationResult from "../../core/Operation/OperationResult";
import { InternalServerError } from "../../core/ErrorHandler/DatabaseConectionError";
import { IPFS } from "./ipfs";
import { ResultCreateNFT } from "../../DTO/NFT/result-create-nft.model";
const DNFT = require('./../../../build/contracts/DortajNFT.json');
const NFT = require('./../../../build/contracts/NFT.json');


export class ContractConfig {

    static coin: any;
    static ether: any;
    private static dNFT: ethers.Contract;
    private static tokenContract: ethers.Contract;

    constructor() {


    }

    static async Initial(): Promise<any> {

        let provider = new ethers.providers.JsonRpcProvider(config.contractConfig.url);
        const signer = provider.getSigner();

        this.tokenContract = new ethers.Contract(config.contractConfig.nftAddress, NFT.abi, signer);
        this.dNFT = new ethers.Contract(config.contractConfig.dortajNftAddress, DNFT.abi, signer);

    }

    static async GetListTokenPrice(): Promise<OperationResult<string>> {
        try {

            const listTokens = await this.dNFT.getListingPrice();
            const listingPrice = listTokens.toString();

            if (listingPrice) {
                return OperationResult.BuildSuccessResult("", listTokens);
            }

            throw new InternalServerError("we can not fidn any List Pricing");

        } catch (error: any) {
            throw new InternalServerError(error.message);
        }
    }

    static async GetAllNFTs(): Promise<OperationResult<any>> {

        try {

            const data = await this.dNFT
                .fetchMarketTokens();

            const items = await Promise.all(data.map(async (res: any) => {

                const tokenUri = await this.tokenContract.tokenURI(res.tokenId);
                const price = ethers.utils.formatUnits(res.price.toString(), "ether");

                let item = {
                    price: price,
                    tokenId: res.tokenId.toNumber(),
                    seller: res.seller,
                    owner: res.owner,
                    name: '',
                    description: '',
                    image: tokenUri
                }

                return item;

            }));

            return OperationResult.BuildSuccessResult("", items);

        } catch (error: any) {
            throw new InternalServerError(error.message);
        }

    }

    static async GetAllMYBuyNFTs(): Promise<OperationResult<any>> {

        try {

            const data = await this.dNFT
                .fetchMyNFTs();

            const items = await Promise.all(data.map(async (res: any) => {

                const tokenUri = await this.tokenContract.tokenURI(res.tokenId);
                const price = ethers.utils.formatUnits(res.price.toString(), "ether");

                let item = {
                    price: price,
                    tokenId: res.tokenId.toNumber(),
                    seller: res.seller,
                    owner: res.owner,
                    name: '',
                    description: '',
                    image: tokenUri
                }

                return item;

            }));

            return OperationResult.BuildSuccessResult("", items);

        } catch (error: any) {
            throw new InternalServerError(error.message);
        }

    }

    static async GetAllMYNFTs(): Promise<OperationResult<any>> {

        try {

            const data = await this.dNFT
                .fetchItemsCreated();

            const items = await Promise.all(data.map(async (res: any) => {

                const tokenUri = await this.tokenContract.tokenURI(res.tokenId);
                const price = ethers.utils.formatUnits(res.price.toString(), "ether");

                let item = {
                    price: price,
                    tokenId: res.tokenId.toNumber(),
                    seller: res.seller,
                    owner: res.owner,
                    name: '',
                    description: '',
                    image: tokenUri
                }

                return item;

            }));

            return OperationResult.BuildSuccessResult("", items);

        } catch (error: any) {
            throw new InternalServerError(error.message);
        }

    }

    static async ByNFT(tokenId: number, nftPrice: string): Promise<OperationResult<any>> {

        try {

            const price = ethers.utils.parseUnits(nftPrice.toString(), "ether");

            await this.dNFT
                .createMarketSale(this.tokenContract.address, tokenId, {
                    value: price
                });

            return OperationResult.BuildSuccessResult("", true);

        } catch (error: any) {

            throw new InternalServerError(error.message);
        }

    }

    static async CreateMarket(nftPrice: string, fileAddress: string): Promise<OperationResult<ResultCreateNFT>> {
        try {

            let testFile = fs.readFileSync(`${fileAddress}`);
            let testBuffer = new Buffer(testFile);

            const ipfs = await IPFS.UploadFile(testBuffer);

            if (!ipfs.result) {
                return OperationResult.BuildFailur(ipfs.message);
            }

            let transaction = await this.tokenContract.mintToken(ipfs.result);
            const tx = await transaction.wait();

            const listPricing = await this.GetListTokenPrice();

            let event = tx.events[0];
            let value = event.args[2];

            let tokenId = value.toNumber();

            const price = ethers.utils.parseUnits(nftPrice, 'wei');

            transaction = this.dNFT.makeMarketItem(
                this.tokenContract.address,
                tokenId,
                price,
                {
                    value: listPricing.result
                }
            );

            return OperationResult.BuildSuccessResult("", {
                nftAddress: config.contractConfig.nftAddress,
                price: ethers.utils.formatUnits(price.toString(), "ether"),
                tokenId: tokenId,
                imageUrl: ipfs.result
            });

        } catch (error: any) {

            throw new InternalServerError(error.messge);
        }
    }

}