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
  Res,
  Req,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ToDoService } from './todo.service';
import { CreateToDoDto } from './dto/create-todo.dto';
import { UpdateToDoDto } from './dto/update-todo.dto';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('todo')
export class ToDoController {
  constructor(
    private readonly todoService: ToDoService,
    private jwtService: JwtService,
  ) {}

  @Get()
  public async findAll() {
    const resp = await this.todoService.findAll();
    return resp;
  }

  @Post()
  @UsePipes(new ValidationPipe())
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

  // User
  @Post('/user')
  @UsePipes(new ValidationPipe())
  public async create(@Body() createUserRequest: CreateUserDto) {
    const saltOrRounds = 12;
    createUserRequest.password = await bcrypt.hash(
      createUserRequest.password,
      saltOrRounds,
    );

    const resp = await this.todoService.create(createUserRequest);
    return resp;
  }

  @Get('/user')
  public async user(@Req() request: Request) {
    const cookie = request.cookies['jwt'];

    const data = await this.jwtService.verifyAsync(cookie);
    return data;
  }

  @Post('/login')
  public async findUser(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const resp = await this.todoService.findUser(loginUserDto);
    if (resp !== null) {
      const payload = { id: resp.id };
      const jwt = await this.jwtService.signAsync(payload);

      const name = 'jwt';
      response.cookie(name, jwt, { httpOnly: true });
      return {
        message: 'success',
      };
    }
    return null;
  }
}
