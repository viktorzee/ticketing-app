import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  subject: string;

  @Column()
  assignedTo: string;

  @Column()
  priority: string;

  @Column()
  status: string;

  @Column()
  createDate: Date;

  @Column()
  dueDate: Date;
}
