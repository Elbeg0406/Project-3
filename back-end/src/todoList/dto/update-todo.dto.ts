import {
  IsNotEmpty,
  MaxLength,
  IsDate,
  IsString,
  MinLength,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateToDoDto {
  @IsNotEmpty()
  @MaxLength(60)
  item?: string;

  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/,
    {
      message: 'password too weak',
    },
  )
  password: string;
}
