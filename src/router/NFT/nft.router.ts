
import express from 'express';
import nftController from '../../Controllers/NFT/NFTController';
import FileToField from '../../middleware/FileToField';
import nftFile from './../../utiles/Multer/NftFile';

const fiat = express.Router();


fiat.get('/getAll',
    nftController.GetAllNFTs);

fiat.get('/myBuy',
    nftController.GetAllMYBuyNFTs);

fiat.get('/myNft',
    nftController.GetAllMYNFTs);

fiat.post('/buy',
    nftController.ByNFT);

fiat.post('/create',
    nftFile.single('file'),
    FileToField.FileToNftFile,
    nftController.CreateNFT);

export default fiat;