import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePassDto } from './dto/create-pass.dto';
import { CreateToDoDto } from './dto/create-todo.dto';
import { ToDoDto } from './dto/todo.dto';
import { UpdateToDoDto } from './dto/update-todo.dto';
import { UserDto } from './dto/user.dto';
import { ToDo, User } from './todo.entity';

@Injectable()
export class ToDoService {
  constructor(
    @InjectRepository(ToDo)
    private todoRepository: Repository<ToDo>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async createOne(createToDoDto: CreateToDoDto): Promise<ToDo> {
    const todo = new ToDo();
    todo.item = createToDoDto.item;
    todo.date_only = createToDoDto.date_only;

    if (!todo.item) {
      throw new BadRequestException('Item is required');
    }
    if (todo.item.length > 255) {
      throw new BadRequestException('Data too long for column item at row 1');
    }

    await this.todoRepository.save(todo);

    const todoDto = this.enityToDto(todo);

    return todoDto;
  }

  private enityToDto(todo): ToDoDto {
    const todoDto = new ToDoDto();
    todoDto.id = todo.id;
    todoDto.item = todo.item;
    todoDto.date_only = todo.date_only;

    return todoDto;
  }
  private entityToDto(user): UserDto {
    const userDto = new UserDto();
    userDto.id = user.id;
    userDto.pass = user.pass;

    return userDto;
  }

  public async findAll() {
    const todos = await this.todoRepository.find();
    const todosDto = todos.map((x) => this.enityToDto(x));

    return todosDto;
  }

  public async createPass(createPassDto: CreatePassDto): Promise<User> {
    const pass = new User();
    pass.pass = createPassDto.pass;

    await this.userRepository.save(pass);

    const passDto = this.entityToDto(pass);

    return passDto;
  }

  public async findUser(id: number) {
    const user = await this.userRepository.findOne(id);
    const userDto = this.entityToDto(user);

    return userDto;
  }

  public async findOne(id: number) {
    const todo = await this.todoRepository.findOne(id);

    if (!todo)
      throw new NotFoundException(`ToDo with the id ${id} was not found`);

    const todoDto = this.enityToDto(todo);

    return todoDto;
  }

  public async updateOne(id: number, updateToDoRequest: UpdateToDoDto) {
    const todo = await this.findOne(id);

    todo.item = updateToDoRequest.item || todo.item;

    await this.todoRepository.save(todo);

    const todoDto = this.enityToDto(todo);

    return todoDto;
  }

  public async deleteOne(id: number) {
    const todo = await this.findOne(id);

    await this.todoRepository.remove(todo);
  }
}
