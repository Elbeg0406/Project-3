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
  UnauthorizedException,
} from '@nestjs/common';
import { ToDoService } from './todo.service';
import { CreateToDoDto } from './dto/create-todo.dto';
import { UpdateToDoDto } from './dto/update-todo.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import * as bcrypt from 'bcrypt';

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
    const user = await this.todoService.create(createUserRequest);

    const { password, ...result } = user;

    return result;
  }

  @Post('/login')
  public async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = this.todoService.findUser(loginUserDto);

    if (!user) {
      return { message: 'User not found' };
    }

    if (await bcrypt.compare(loginUserDto.password, (await user).password)) {
      const jwt = await this.jwtService.signAsync({ id: (await user).id });

      response.cookie('jwt', jwt, { httpOnly: true });
      return { message: 'Log In' };
    }
    return { message: 'Password invalid' };
  }

  @Get('/login/user')
  public async user(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];
      const data: LoginUserDto = await this.jwtService.verifyAsync(cookie);

      if (!data) throw new UnauthorizedException();

      const user = await this.todoService.findUser(data);

      const { password, ...result } = user;

      return result;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @Post('/logout')
  public async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return { message: 'Log Out' };
  }
}
