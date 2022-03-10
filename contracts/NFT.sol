// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721URIStorage {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenId;

    address contractAddress;

    constructor(address marketPlaceAddress) ERC721('DortajNFT','DNF') {
        contractAddress=marketPlaceAddress;
    }

    function mintToken(string memory tokenURI) public returns(uint256) {
        _tokenId.increment();
        uint256 newItemId = _tokenId.current();
        _mint(msg.sender,newItemId);
        _setTokenURI(newItemId,tokenURI);
        setApprovalForAll(contractAddress,true);
        return newItemId;
    } 


}