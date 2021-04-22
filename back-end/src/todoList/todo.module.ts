import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDoService } from './todo.service';
import { ToDoController } from './todo.controller';
import { ToDo, User } from './todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ToDo, User])],
  exports: [TypeOrmModule],
  providers: [ToDoService],
  controllers: [ToDoController],
})
export class ToDoModule {}
