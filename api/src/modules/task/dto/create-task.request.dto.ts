import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class createTaskRequestDto {
  @IsNotEmpty()
  title: string;
  @ApiProperty()
  status: number;
}
