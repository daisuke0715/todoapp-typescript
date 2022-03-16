import { ApiProperty } from '@nestjs/swagger';
export class updateTaskRequestDto {
  @ApiProperty()
  title: string
  @ApiProperty()
  status: number
}