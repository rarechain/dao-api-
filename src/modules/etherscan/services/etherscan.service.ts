import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';
import { Cron, CronExpression } from '@nestjs/schedule';
import { getRepository } from 'typeorm';
import { Etherscan } from '../entities/etherscan.entity'

@Injectable()
export class EtherscanService {
  constructor(private httpService: HttpService) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  async updateEtherscanData() {
    const repository = getRepository(Etherscan);
    const etherscan = new Etherscan()
    etherscan.circulatingSupply = await this.getCirculatingSupply()
    etherscan.numberOfHolders = "23"
    etherscan.id = 1
    console.log("Etherscan data update")
    repository.save(etherscan)
  }

  async getCirculatingSupply(): Promise<string> {

    const deadAddressBalance = await lastValueFrom(this.httpService
      .get(
        'https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x3402E15b3EA0f1aEC2679c4Be4c6d051ceF93953&address=0x000000000000000000000000000000000000dead&tag=latest&apikey=JPFSKZ3QVT5ZWFZTNZW4S1IBYDJPQQAKHY',
      )
    )

    const burnAddressBalance = await lastValueFrom(this.httpService
      .get(
        'https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x3402E15b3EA0f1aEC2679c4Be4c6d051ceF93953&address=0x0000000000000000000000000000000000000000&tag=latest&apikey=JPFSKZ3QVT5ZWFZTNZW4S1IBYDJPQQAKHY',
      )
    )

    return this.countCirculatingSupply(deadAddressBalance, burnAddressBalance).toString();
  }


  async getNumberOfHolders(): Promise<string> {

    const htmlPayload = await lastValueFrom(this.httpService
      .get(
        'https://etherscan.io/token/0x3402e15b3ea0f1aec2679c4be4c6d051cef93953#balances',
      )
    )

    let holdersNumber = "0";
    const str = 'Holders:';
    const index = htmlPayload.data.indexOf(str)
    const payloadsAfterHoldersTextField = htmlPayload.data.substring(index + 50, index + 110)

    payloadsAfterHoldersTextField.split('\n').forEach((payload: string) => {
      // If number only, then is the number of holders 
      if(/^\d+$/.test(payload))
      {
        holdersNumber = payload
      }
    });

    return holdersNumber
  }

  countCirculatingSupply(deadAddressBalance: AxiosResponse<any>, burnAddressBalance: AxiosResponse<any>) {
    const circulatingSupply = 10000000000000;
    return Math.round(
      circulatingSupply - 
      deadAddressBalance.data.result * 0.000000000000000001 - 
      burnAddressBalance.data.result * 0.000000000000000001)
  }
}
