import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateToDoDto } from './../todoList/dto/create-todo.dto';
import { UpdateToDoDto } from './../todoList/dto/update-todo.dto';
import { ToDo } from './todo.entity';
import { ToDoService } from './todo.service';

describe('ToDoService', () => {
  let todoService: ToDoService;
  let newID = 0;
  let nnewID = 0;
  let nnnewID = 0;
  let nnnnewID = 0;

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
    }).compile();
    todoService = module.get(ToDoService);
  });

  describe('CREATE', () => {
    it('calls the repo with correct parameters', async () => {
      const item = 'Unit testing';
      const date = new Date('2021-04-29');
      const password = 'Ab99175185@';
      const createToDoData: CreateToDoDto = { item, date, password };

      const result = await todoService.createOne(createToDoData);
      newID = result.id;

      expect(result.item).toBe(createToDoData.item);
    });

    it('calls the repo with empty string', async () => {
      const item = '';
      const date = new Date('2021-04-29');
      const password = 'Ab99175185@';
      const createToDoData: CreateToDoDto = { item, date, password };

      try {
        const result = await todoService.createOne(createToDoData);
        nnewID = result.id;

        expect(result.item).toBe(createToDoData.item);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
        expect(e.message).toBe('Item is required');
      }
    });

    // it('calls the repo with item:300 string length', async () => {
    //   const item =
    //     'aaaaaaaaaabbbbbbbbbbccccccccccddddddddddffffffffffaaaaaaaaaabbbbbbbbbbccccccccccddddddddddffffffffffaaaaaaaaaabbbbbbbbbbccccccccccddddddddddffffffffffaaaaaaaaaabbbbbbbbbbccccccccccddddddddddffffffffffaaaaaaaaaabbbbbbbbbbccccccccccddddddddddffffffffffaaaaaaaaaabbbbbbbbbbccccccccccddddddddddffffffffff';
    //   const date_only = new Date('2021-04-29');
    //   try {
    //     const createToDoData: CreateToDoDto = { item, date_only };

    //     const result = await todoService.createOne(createToDoData);
    //     expect(result.item).toBe(createToDoData.item);
    //   } catch (e) {
    //     expect(e).toBeInstanceOf(BadRequestException);
    //     console.log(e.message);
    //     expect(e.message).toBe(
    //       'item must be shorter than or equal to 60 characters',
    //     );
    //   }
    // });

    // it('calls the repo with item: "カタカナ"', async () => {
    //   const item = 'カタカナ';
    //   const date_only = new Date('2021-04-29');
    //   const createToDoData: CreateToDoDto = { item, date_only };

    //   const result = await todoService.createOne(createToDoData);
    //   nnnewID = result.id;

    //   expect(result.item).toBe(createToDoData.item);
    // });

    // it('calls the repo with item: ', async () => {
    //   const item = "бил'гүүн";
    //   const date_only = new Date('2021-04-29');
    //   const createToDoData: CreateToDoDto = { item, date_only };

    //   const result = await todoService.createOne(createToDoData);
    //   nnnnewID = result.id;

    //   expect(result.item).toBe(createToDoData.item);
    // });

    // it('calls the repo with item:number', async () => {
    //   const item = 1234;
    //   const createToDoData: CreateToDoDto = { item };

    //   // const result = await todoService.createOne(createToDoData);

    //   // expect(result.item).toThrow();
    // });

    // it('calls the repo with item:object', async () => {
    //   const item = { xaxax: 'xaxa' };
    //   const createToDoData: CreateToDoDto = { item };

    //   const result = await todoService.createOne(createToDoData);

    //   expect(result.item).toBe(createToDoData.item);
    // });

    // it('calls the repo with item: ', async () => {
    //   const createToDoData: CreateToDoDto = {};

    //   const result = await todoService.createOne(createToDoData);

    //   expect(result.item).toBe(createToDoData.item);
    // });

    // it('calls the repo with undefined', async () => {
    //   try {
    //     const item = undefined;
    //     const createToDoData: CreateToDoDto = { item };

    //     const result = await todoService.createOne(createToDoData);

    //     expect(result.item).toBe(createToDoData.item);
    //   } catch (e) {
    //     expect(e).toBeInstanceOf(BadRequestException);
    //     expect(e.message).toBe('Item is required');
    //   }
    // });
  });

  describe('READ', () => {
    it('should return todo', async () => {
      const result = await todoService.findOne(newID);

      expect(result).toMatchObject({ id: newID, item: 'Unit testing' });
    });
  });

  describe('UPDATE', () => {
    it('calls the repo with item:"Unit testing with Jest" then should return todo', async () => {
      const item = 'Unit testing with Jest';
      const date = new Date('2021-05-05');
      const password = 'Abcd9917@';
      const updateToDoData: UpdateToDoDto = { item, date, password };

      const result = await todoService.updateOne(newID, updateToDoData);

      expect(result).toEqual({
        id: newID,
        item: updateToDoData.item,
        date: updateToDoData.date,
        password: updateToDoData.password,
      });
    });

    // it('calls the repo with item:"Hello LBG" then should return todo', async () => {
    //   const item = 'Hello LBG';
    //   const updateToDoData: UpdateToDoDto = { item };

    //   const result = await todoService.updateOne(newID, updateToDoData);

    //   expect(result).toEqual({ id: newID, item: updateToDoData.item });
    // });

    // it('calls the repo with item:number then should return todo', async () => {
    //   const item = 1234;
    //   const updateToDoData: UpdateToDoDto = { item };

    //   const result = await todoService.updateOne(newID, updateToDoData);

    //   expect(result).toEqual({ id: newID, item: updateToDoData.item });
    // });

    // it('calls the repo with item:"Unit testing with Jest" then should return todo', async () => {
    //   const item = 'Unit testing with Jest';
    //   const updateToDoData: UpdateToDoDto = { item };

    //   const result = await todoService.updateOne(newID, updateToDoData);

    //   expect(result).toEqual({ id: newID, item: updateToDoData.item });
    // });
  });

  describe('DELETE', () => {
    it('should return undefined', async () => {
      const result = await todoService.deleteOne(newID);
      // await todoService.deleteOne(nnnewID);
      // await todoService.deleteOne(nnnnewID);

      expect(result).toBeUndefined();
    });
  });
});
