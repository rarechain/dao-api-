import { BigNumber } from 'ethers';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class QAOVoteAttendance extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint' })
  voteId: string;

  @Column({ type: 'bigint' })
  amount: string;

  @Column({ type: 'bigint' })
  timestamp: string;

  @Column({ type: 'bigint' })
  lockWeeks: string;

  @Column({ type: 'bool' })
  position: boolean;

  @Column({ type: 'bool' })
  withdrawn: boolean;

  @Column({ type: 'bigint' })
  multiplier: string;

  @Column({
    type: 'bigint',
    default: null,
  })
  totalWeight: string;

  @DeleteDateColumn()
  deleted: Date;

  @CreateDateColumn()
  createdAt: Date;

  multiplierCalculation() {
    const lockweeks = BigNumber.from(this.lockWeeks);
    const powFactor = BigNumber.from(1.4);
    this.multiplier = BigNumber.from(1)
      .add(BigNumber.from(0.005).mul(lockweeks.pow(powFactor)))
      .toString();
  }

  @BeforeInsert()
  async totalWeightCalculation() {
    this.multiplierCalculation()
    this.totalWeight = BigNumber.from(this.amount).mul(this.multiplier).toString()
  }
}
