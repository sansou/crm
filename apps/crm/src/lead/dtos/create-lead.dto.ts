import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateLeadDto {
  @ApiProperty({ description: 'Nome do lead', example: 'João Silva' })
  @IsString()
  @IsNotEmpty({ message: "name is required" })
  name: string;

  @ApiProperty({ description: 'E-mail do lead', example: 'joao.silva@example.com' })
  @IsEmail()
  @IsNotEmpty({ message: "email is required" })
  email: string;

  @ApiProperty({ description: 'Telefone do lead', example: '(11) 99999-9999' })
  @IsString()
  @Length(10, 15, { message: 'O telefone deve ser entre 10 e 15 caracteres' })
  @IsNotEmpty({ message: "phone is required" })
  phone: string;

  @ApiProperty({ description: 'Id do projeto', example: 'h12u13u21n123' })
  @IsString()
  @IsNotEmpty({ message: "projectId is required" })
  projectId: string;


  @ApiProperty({ description: 'Cargo do lead', example: 'Diretor executivo', required: false })
  @IsString()
  position?: string;

  @ApiProperty({ description: 'Estado do lead', example: 'São Paulo', required: false })
  @IsString()
  state?: string;

  @ApiProperty({ description: "Cidade do lead", example: 'São Paulo', required: false })
  @IsString()
  city?: string;
}
