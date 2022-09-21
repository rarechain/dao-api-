import { Module } from '@nestjs/common';
import { EtherscanModule } from './modules/etherscan/etherscan.module';
import { BlockchainModule } from './modules/blockchain/blockchain.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    EventEmitterModule.forRoot({
      wildcard: true,
      delimiter: '.',
      newListener: true
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot(),
    EtherscanModule,
    BlockchainModule
  ],
})
export class AppModule {}
