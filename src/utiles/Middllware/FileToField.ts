import { NextFunction, Request, Response } from "express";
import Middllware from "./Middllware";


export default new class FileToField extends Middllware {


  FileToAvatar(req: Request, res: Response, next: NextFunction) {

    if (!req.file) {
      req.body.avatar = undefined;
    } else {
      req.body.avatar = req.file.originalname;
    }
    next();
  }


  FileToBackImage(req: any, res: Response, next: NextFunction) {

    if (!req.files.backImage) {
      req.body.backImage = undefined;
    } else {
      req.body.backImage = req.files.backImage[0].destination;
    }
    next();
  }

  FileToFrontImage(req: any, res: Response, next: NextFunction) {
    if (!req.files.frontImage) {
      req.body.frontImage = undefined;
    } else {
      req.body.frontImage = req.files.frontImage[0].destination;
    }
    next();
  }

  FileToImage(req: any, res: Response, next: NextFunction) {

    if (!req.files.image) {
      req.body.image = undefined;
    } else {
      req.body.image = req.files.image[0].destination;
    }
    next();
  }

  FileToSelfieImage(req: any, res: Response, next: NextFunction) {

    if (!req.files.selfieImage) {
      req.body.selfieImage = undefined;
    } else {
      req.body.selfieImage = req.files.selfieImage[0].destination;
    }
    next();
  }


}