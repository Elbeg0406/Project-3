import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ToDoModule} from './todoList/todo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Ab99175185',
      database: 'todo_list',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ToDoModule,
  ],
})
export class AppModule {}
