import { Injectable, OnModuleInit } from '@nestjs/common';
import { abi } from '../votingAbi.json';
import { BigNumber, Contract, ethers } from 'ethers';
import { JsonRpcProvider } from '@ethersproject/providers';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { QAOVoteAttendanceDao, QAOVoteDao } from '../dao/vote.dao';
import { ConnectionInfo } from '@ethersproject/web';

@Injectable()
export class BlockchainService implements OnModuleInit {
  private networkInfo: ConnectionInfo;
  private qaoContract: Contract;

  constructor(private eventEmitter: EventEmitter2) {
    this.networkInfo = {
      url: process.env.PROVIDER_URL || 'http://127.0.0.1:8545',
    };
    const voteContractAddress =
      process.env.VOTE_CONTACT_ADDRESS ||
      '0x18a117a08be4441d3aDB0530e1D9c0588491B457';
    const provider: JsonRpcProvider = new ethers.providers.JsonRpcProvider(
      this.networkInfo,
    );
    this.qaoContract = new ethers.Contract(voteContractAddress, abi, provider);
  }

  onModuleInit() {
    this.listenOnStartOfVote();
    this.listenOnAttendanceSubmitted();
  }

  async listenOnStartOfVote() {
    this.qaoContract.on('StartOfVote', async (voteId: BigNumber) => {
      let qaoVoteDto: QAOVoteDao = new QAOVoteDao();
      qaoVoteDto.voteId = voteId;
      qaoVoteDto = await this.qaoContract.getVote(voteId);
      this.sendStartOfVoteEvent(qaoVoteDto);
    });
  }

  sendStartOfVoteEvent(qaoVoteDto: QAOVoteDao) {
    this.eventEmitter.emit('vote.created', qaoVoteDto);
  }

  async listenOnAttendanceSubmitted() {
    this.qaoContract.on(
      'AttendanceSubmitted',
      async (user, _, attendanceId) => {
        const qaoVoteAttendanceDto: QAOVoteAttendanceDao =
          await this.qaoContract.getAttendance(user, attendanceId);
        this.sendAttendanceSubmittedEvent(qaoVoteAttendanceDto);
      },
    );
  }

  sendAttendanceSubmittedEvent(qaoVoteAttendanceDto: QAOVoteAttendanceDao) {
    this.eventEmitter.emit('attendance.created', qaoVoteAttendanceDto);
  }
}
