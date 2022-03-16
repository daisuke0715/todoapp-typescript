import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from 'src/ripositories/task.repository';
import { DeleteResult } from 'typeorm';
import { createTaskRequestDto } from './dto/create-task.request.dto';
import { TaskResponseDto } from './dto/task.response.dto';
import { TasksResponseDto } from './dto/tasks.response.dto';
import { updateTaskRequestDto } from './dto/update-task.request.dto';
import { ITaskService } from './interface/task-service';

@Injectable()
export class TaskService implements ITaskService {
  constructor(private readonly _taskRepository: TaskRepository) { }
  
  async createTask(param: createTaskRequestDto): Promise<TaskResponseDto> {
    const newTask = this._taskRepository.create(param);
    if (!newTask) throw new NotFoundException();
    const task = await this._taskRepository.save(newTask);
    return { task };
  }
   
  async getTasks(): Promise<TasksResponseDto>  {
    const tasks = await this._taskRepository.find();
    if (!tasks) throw new NotFoundException();
    return { tasks };
  }

  async findTask(taskId: number): Promise<TaskResponseDto> {
    const task = await this._taskRepository.findOne(taskId);
    if (!task) throw new NotFoundException();
    return { task }
  }

  async updateTask(taskId: number , param: updateTaskRequestDto): Promise<TaskResponseDto> {
    const origin = await this._taskRepository.findOne(taskId);
    if (!origin) throw new NotFoundException();
    const task = await this._taskRepository.save({ ...origin, ...param });
    return { task };
  }

  async deleteTask(taskId: number): Promise<DeleteResult> {
    const result = await this._taskRepository.delete(taskId);
    if (result.affected === 0) throw new NotFoundException();
    return result;
  }
}
