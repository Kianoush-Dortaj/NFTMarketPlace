
const dortajNft = artifacts.require("DortajNFT");
const nft = artifacts.require("NFT");

module.exports = async function (deployer) {

    await deployer.deploy(dortajNft);
    await deployer.deploy(nft, dortajNft.address);

}