import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class PostDto {

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  title: string;



  @IsString()
  @MinLength(10, { message: 'Min 10 Char' })
  @MaxLength(500)
  description: string;


}