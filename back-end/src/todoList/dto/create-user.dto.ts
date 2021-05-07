import {
  IsNotEmpty,
  MaxLength,
  IsString,
  MinLength,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(60)
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/,
    {
      message: 'password too weak',
    },
  )
  password: string;
}
