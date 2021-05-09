import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  readonly id?: number;

  @IsNotEmpty()
  readonly username?: string;

  @IsNotEmpty()
  readonly password: string;
}
