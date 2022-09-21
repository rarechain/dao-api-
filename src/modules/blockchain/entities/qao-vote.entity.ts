import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class QAOVote extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint' })
  voteId: string;

  @Column()
  creator: string;

  @Column({ type: 'bigint' })
  timestamp: string;

  @Column({ type: 'bigint' })
  votePositive: string;

  @Column({ type: 'bigint' })
  voteNegative: string;

  @Column()
  valid: boolean;

  @Column()
  heading: string;

  @Column()
  description: string;
}