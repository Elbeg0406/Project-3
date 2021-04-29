import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateToDoDto } from './dto/create-todo.dto';
import { ToDoDto } from './dto/todo.dto';
import { UpdateToDoDto } from './dto/update-todo.dto';
import { ToDo } from './todo.entity';

@Injectable()
export class ToDoService {
  constructor(
    @InjectRepository(ToDo)
    private todoRepository: Repository<ToDo>,
  ) {}

  public async createOne(createToDoDto: CreateToDoDto): Promise<ToDo> {
    const todo = new ToDo();
    todo.item = createToDoDto.item;
    todo.date = createToDoDto.date;
    todo.password = createToDoDto.password;

    await this.todoRepository.save(todo);

    const todoDto = this.entityToDto(todo);

    return todoDto;
  }

  private entityToDto(todo): ToDoDto {
    const todoDto = new ToDoDto();
    todoDto.id = todo.id;
    todoDto.item = todo.item;
    todoDto.date = todo.date;
    todoDto.password = todo.password;

    return todoDto;
  }

  public async findAll() {
    const todos = await this.todoRepository.find();
    const todosDto = todos.map((x) => this.entityToDto(x));

    return todosDto;
  }

  public async findOne(id: number) {
    const todo = await this.todoRepository.findOne(id);

    if (!todo)
      throw new NotFoundException(`ToDo with the id ${id} was not found`);

    const todoDto = this.entityToDto(todo);

    return todoDto;
  }

  public async updateOne(id: number, updateToDoRequest: UpdateToDoDto) {
    const todo = await this.findOne(id);

    todo.item = updateToDoRequest.item || todo.item;
    todo.date = updateToDoRequest.date || todo.date;
    todo.password = updateToDoRequest.password || todo.password;

    await this.todoRepository.save(todo);

    const todoDto = this.entityToDto(todo);

    return todoDto;
  }

  public async deleteOne(id: number) {
    const todo = await this.findOne(id);

    await this.todoRepository.remove(todo);
  }
}
