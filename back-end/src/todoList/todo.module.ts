import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDoService } from './todo.service';
import { ToDoController } from './todo.controller';
import { LoginUser, ToDo } from './todo.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([ToDo, LoginUser]),
    JwtModule.register({ secret: 'secret', signOptions: { expiresIn: '1d' } }),
  ],
  exports: [TypeOrmModule],
  providers: [ToDoService],
  controllers: [ToDoController],
})
export class ToDoModule {}
