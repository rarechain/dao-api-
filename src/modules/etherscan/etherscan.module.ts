import { EtherscanService } from './services/etherscan.service';
import { EtherscanController } from './controllers/etherscan.controller';
import { EtherscanMiddleware } from './middlewares/etherscan.middleware'
import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule],
    controllers: [EtherscanController],
    providers: [EtherscanService],
})

export class EtherscanModule implements NestModule { 
    configure(consumer: MiddlewareConsumer) {
      consumer.apply(EtherscanMiddleware).forRoutes('api/*');
  }
}