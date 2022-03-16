import { ApiProperty } from '@nestjs/swagger';
import { Task } from 'src/database/entities/task.entity';

export class TaskResponseDto {
  @ApiProperty()
  task: Task
}