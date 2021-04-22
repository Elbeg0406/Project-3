import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDoModule } from './todoList/todo.module';

@Module({
  imports: [TypeOrmModule.forRoot(), ToDoModule],
})
export class AppModule {}
