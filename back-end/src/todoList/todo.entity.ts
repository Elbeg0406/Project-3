import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ToDo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  item: string;
}