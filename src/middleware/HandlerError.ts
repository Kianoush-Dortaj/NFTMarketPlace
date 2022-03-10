

import { Request, Response, NextFunction } from 'express';
import { BaseError } from '../core/ErrorHandler/BaseError';
import { InternalServerError } from '../core/ErrorHandler/DatabaseConectionError';
import { InternalError } from '../core/Reponse/internal-error';
import { Translate } from '../utiles/locals/Locals';
import { WinstonLogger } from '../utiles/logger/winston/WinstonLogger';
import { Utiles } from '../utiles/utiles';

function handleError(
  err: TypeError | BaseError,
  req: Request,
  res: Response,
  next: NextFunction
) {

  let customError = err;

  let lang = Utiles.acceptLanguage(req);
  
  WinstonLogger.logger.error(customError.message);

  if (err instanceof InternalServerError) {
    customError = new InternalServerError(
      Translate.translate[lang].INTERNALSERVERERROR()
    );
  }

   new InternalError(customError.message).send(res);
};

export default handleError;