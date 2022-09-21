import { BlockchainService } from './services/blockchain.service';
import { Module } from '@nestjs/common';
import { VoteListener } from './listeners/vote.listener'

@Module({
  imports: [],
  controllers: [],
  providers: [BlockchainService, VoteListener],
})

export class BlockchainModule {}
