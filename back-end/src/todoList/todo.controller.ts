import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Res,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ToDoService } from './todo.service';
import { CreateToDoDto } from './dto/create-todo.dto';
import { UpdateToDoDto } from './dto/update-todo.dto';
import { CreatePassDto } from './dto/create-pass.dto';

@Controller('todo')
export class ToDoController {
  constructor(private readonly todoService: ToDoService) {}

  @Get()
  public async findAll() {
    const resp = await this.todoService.findAll();
    return resp;
  }

  @Get('/user/:id')
  public async findUser(@Param('id') id: number) {
    const resp = await this.todoService.findUser(id);
    return resp;
  }

  @Post('/user')
  public async createPass(@Body() createPassRequest: CreatePassDto) {
    const resp = await this.todoService.createPass(createPassRequest);
    return resp;
  }

  @Post()
  public async createOne(@Body() createToDoRequest: CreateToDoDto) {
    const resp = await this.todoService.createOne(createToDoRequest);
    return resp;
  }

  @Get('/:id')
  public async findOne(@Param('id') id: number) {
    const resp = await this.todoService.findOne(id);

    return resp;
  }

  @Put('/:id')
  public async updateOne(
    @Param('id') id: number,
    @Body() updateToDoRequest: UpdateToDoDto,
  ) {
    const resp = await this.todoService.updateOne(id, updateToDoRequest);

    return resp;
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteOne(@Param('id') id: number) {
    await this.todoService.deleteOne(id);
  }
}
