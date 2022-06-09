import { Router } from 'express';
import authRouter from './auth/Auth/AuthRouter';
import fiatRouter from './Fiat/fiat.router';
import nftRouter from './NFT/nft.router';
import userSettingRouter from './UserSetting/UserSetting.router';
import userVerificationRouter from './UserVerfication/user-verification.router';
import transaction from './transaction/nft.router';


const router = Router();

router.use('/api/auth', authRouter);

router.use('/api/setting', userSettingRouter);

router.use('/api/verification', userVerificationRouter);

router.use('/api/fiat', fiatRouter);

router.use('/api/nft', nftRouter);

router.use('/api/transaction', transaction);


export default router;