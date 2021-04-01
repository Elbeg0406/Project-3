import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDoService } from './todo.service';
import { ToDoController } from './todo.controller';
import { ToDo } from './todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ToDo])],
  exports: [TypeOrmModule],
  providers: [ToDoService],
  controllers: [ToDoController],
})
export class ToDoModule {} 