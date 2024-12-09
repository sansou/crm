import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AddLeadDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;
}
