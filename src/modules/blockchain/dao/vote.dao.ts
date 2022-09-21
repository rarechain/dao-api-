import { BigNumber } from 'ethers';

export class QAOVoteDao {
  voteId: BigNumber;
  readonly creator: string;
  readonly timestamp: BigNumber;
  readonly votePositive: BigNumber;
  readonly voteNegative: BigNumber;
  readonly valid: boolean;
  readonly heading: string;
  readonly description: string;
}

export class QAOVoteAttendanceDao {
  voteId: BigNumber;
  readonly amount: BigNumber;
  readonly timestamp: BigNumber;
  readonly lockWeeks: BigNumber;
  readonly position: boolean;
  readonly withdrawn: boolean;
  readonly multiplier: BigNumber;
}
