import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ToDoService } from './todo.service';
import { CreateToDoDto } from './dto/create-todo.dto';
import { UpdateToDoDto } from './dto/update-todo.dto';

@Controller('todo')
export class ToDoController {
  constructor(private readonly todoService: ToDoService) {}

  @Get()
  public async findAll() {
    const resp = await this.todoService.findAll();
    return resp;
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  public async createOne(@Body() createToDoRequest: CreateToDoDto) {
    const resp = await this.todoService.createOne(createToDoRequest);
    return resp;
  }

  @Get('/:id')
  public async findOne(@Param('id', ParseIntPipe) id: number) {
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
