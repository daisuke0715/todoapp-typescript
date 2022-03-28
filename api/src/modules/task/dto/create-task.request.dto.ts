import { ApiProperty } from '@nestjs/swagger';

export class createTaskRequestDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  status: number;
}
