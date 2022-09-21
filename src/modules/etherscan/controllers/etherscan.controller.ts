import {
  Controller,
  Get,
  Query,
  UseInterceptors
} from '@nestjs/common';
import { EtherscanInterceptor } from '../interceptors/etherscan.interceptor';
import { getRepository } from 'typeorm';
import { Etherscan } from '../entities/etherscan.entity'

@Controller('api')
@UseInterceptors(EtherscanInterceptor)
export class EtherscanController {

  @Get('circulating-supply')
  async getCirculatingSupply(@Query('apikey') apikey: string): Promise<string> {
    const repository = getRepository(Etherscan);
    const etherscan = await repository.findOne()
    return etherscan.circulatingSupply
  }

  @Get('number-of-holders')
  async getNumberOfHolders(@Query('apikey') apikey: string): Promise<string> {
    const repository = getRepository(Etherscan);
    const etherscan = await repository.findOne()
    return etherscan.numberOfHolders
  }
}
  
