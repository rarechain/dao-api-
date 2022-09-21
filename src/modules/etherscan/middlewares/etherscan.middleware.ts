import { Injectable, HttpStatus, HttpException, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class EtherscanMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    if (req.query.apikey !== 'stony') {
      console.log("Bad APIKey: " + req.query.apikey)
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    next();
  }
}

