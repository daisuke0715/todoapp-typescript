import { Injectable } from '@nestjs/common';
import { Task } from 'src/database/entities/task.entity';
import { EntityRepository, Repository } from 'typeorm';

@Injectable()
@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {}