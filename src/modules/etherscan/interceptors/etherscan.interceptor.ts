import { Injectable, NestInterceptor, ExecutionContext, CallHandler, OnModuleInit } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class EtherscanInterceptor implements NestInterceptor {
  
  private discord: any
  private webhookClient: any
  private embed: any

  constructor(){
    this.discord = require('discord.js');
    this.webhookClient = new this.discord.WebhookClient(
      process.env.DISCORD_ID || '870262234457210901', 
      process.env.DISCORD_TOKEN || '4VFloVwL36TxXWQkMy64lX-npItmYWVjKBoA-LW0IgN-MJ65288RkUCxk3PETnwN8WJH'
    );
    this.embed = new this.discord.MessageEmbed()
      .setColor('#ff0000')
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        catchError(err => 
          this.webhookClient.send(err, {embeds: [this.embed]})
        ),
      );
  }
}