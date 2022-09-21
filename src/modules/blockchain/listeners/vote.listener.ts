import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { getRepository } from 'typeorm';
import { QAOVoteAttendanceDao, QAOVoteDao } from '../dao/vote.dao';
import { QAOVoteAttendance } from '../entities/qao-vote-attendance.entity';
import { QAOVote } from '../entities/qao-vote.entity'

@Injectable()
export class VoteListener {
  @OnEvent('vote.created')
  handleVoteCreatedEvent(qaoVoteDto: QAOVoteDao) {
    const qaoVote: QAOVote = new QAOVote()
    qaoVote.voteId = qaoVoteDto.voteId.toString();
    qaoVote.creator = qaoVoteDto.creator;
    qaoVote.timestamp = qaoVoteDto.timestamp.toString();
    qaoVote.votePositive = qaoVoteDto.votePositive.toString();
    qaoVote.voteNegative = qaoVoteDto.voteNegative.toString();
    qaoVote.valid = qaoVoteDto.valid;
    qaoVote.heading = qaoVoteDto.heading;
    qaoVote.description = qaoVoteDto.description;
    const repository = getRepository(QAOVote);
    repository.save(qaoVote);
  }

  @OnEvent('attendance.created')
  handleAttendanceCreatedEvent(qaoVoteAttendanceDao: QAOVoteAttendanceDao) {
    const qaoVoteAttendance: QAOVoteAttendance = new QAOVoteAttendance();
    qaoVoteAttendance.voteId = qaoVoteAttendanceDao.voteId.toString();
    qaoVoteAttendance.amount = qaoVoteAttendanceDao.amount.toString();
    qaoVoteAttendance.timestamp = qaoVoteAttendanceDao.timestamp.toString();
    qaoVoteAttendance.lockWeeks = qaoVoteAttendanceDao.lockWeeks.toString();
    qaoVoteAttendance.position = qaoVoteAttendanceDao.position;
    qaoVoteAttendance.withdrawn = qaoVoteAttendanceDao.withdrawn;
    qaoVoteAttendance.multiplier = qaoVoteAttendanceDao.multiplier.toString();
    const repository = getRepository(QAOVoteAttendance);
    repository.save(qaoVoteAttendance);
  }
}
