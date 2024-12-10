import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDTO {
  @ApiProperty({ description: 'Nome do projeto', example: 'Projeto inicial' })
  @IsString()
  @IsNotEmpty({ message: "name is required" })
  name: string;

}
