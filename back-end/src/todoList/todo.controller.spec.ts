import { ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateToDoDto } from './dto/create-todo.dto';
import { ToDoController } from './todo.controller';
import { ToDo } from './todo.entity';
import { ToDoService } from './todo.service';

describe('ToDoController', () => {
  let todoController: ToDoController;
  let testID = 0;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([ToDo]),
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
      ],
      providers: [ToDoService],
      controllers: [ToDoController],
    })
      .overridePipe(new ValidationPipe())
      .useValue('')
      .compile();
    todoController = module.get(ToDoController);
  });

  describe('CREATE', () => {
    it('calls the repo with correct parameters', async () => {
      const data: CreateToDoDto = {
        item: '',
        date: new Date('2021-05-01'),
        password: 'Ab99',
      };

      const result = await todoController.createOne(data);
      testID = result.id;

      expect(result.item).toBe(data.item);
    });
  });

  describe('DELETE', () => {
    it('should return undefined', async () => {
      const result = await todoController.deleteOne(testID);

      expect(result).toBeUndefined();
    });
  });
});
