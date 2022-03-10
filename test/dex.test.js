const assert = require("assert");
const { idText } = require("typescript");

const DortajNFT = artifacts.require("DortajNFT");
const NFT = artifacts.require("NFT");

contract("Dex", (accounts) => {

    let dNFT;
    let nft;
    let nftContractAddress;

    beforeEach(async () => {

        dNFT = await DortajNFT.new();
        const marketAddress = dNFT.address;

        nft = await NFT.new(marketAddress);
        nftContractAddress = NFT.address;
        NFT.deployed();
    });

    // it("Get Listing Price", async () => {

    //     const listTokens = await dNFT.getListingPrice();
    //     assert.equal(listTokens, '45000000000000000');
    // });
    // it("Mint Token", async () => {

    //     await nft.mintToken('https-1');
    //     await nft.mintToken('https-2');

    // });

    // it("Full Test", async () => {

    //     await nft.mintToken('https-1');
    //     await nft.mintToken('https-2');

    //     const listTokens = await dNFT.getListingPrice();
    //     const auctionPrice = web3.utils.toWei("0.01", "ether");

    //     await dNFT.makeMarketItem(nftContractAddress, 1, auctionPrice, { from: accounts[0], value: listTokens.toString() });
    //     await dNFT.makeMarketItem(nftContractAddress, 2, auctionPrice, { from: accounts[0], value: listTokens.toString() });

    //     // await dNFT.makeMarketItem(nftContractAddress, 1, auctionPrice, { from: accounts[0], value: listTokens });
    //     // await dNFT.makeMarketItem(nftContractAddress, 2, auctionPrice, { from: accounts[0], value: listTokens });
    // });

    // it("Add tokens and contract address Success", async () => {

    //     const tokenInfo = await dex.getTokenContractAddress("USDT");

    //     assert(tokenInfo == "0xdac17f958d2ee523a2206206994597c13d831ec7");
    // })

    // it("show Errro send Token", async () => {

    //     await dex
    //         .sendTokenWithSmartContractAddress(
    //             "USDT",
    //             "0xee61f5fb0db81d3a09392375ee96f723c0620e07",
    //             "0xdac17f958d2ee523a2206206994597c13d831ec7",
    //             1000)

    // })

    it("Get All NFT Markets", async () => {

        // await web3.eth.sendTransaction(
        //     { from: accounts[2], to: nftContractAddress, value: web3.utils.toWei('1') });

        const listTokens = await dNFT.getListingPrice();
        const listingPrice = listTokens.toString();

        const auctionPrice = web3.utils.toWei("1", "ether");
        await dNFT.makeMarketItem(
            nftContractAddress,
            1,
            auctionPrice,
            { from: accounts[1], value: listingPrice }
        );

        const getAllNFTMarkets = await dNFT.fetchMarketTokens();

        assert.equal(getAllNFTMarkets.length, 1);
    });




})