import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ToDo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 60 })
  item: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ length: 20 })
  password: string;
}

@Entity()
export class LoginUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  username: string;

  @Column({ length: 60 })
  password: string;
}
