import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  public getAllTasks() {
    return this.tasks;
  }

  public getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }

    return tasks;
  }
  public createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.DONE,
    };
    this.tasks.push(task);
    return task;
  }

  public getTaskById(id: string) {
    return this.tasks.find((task) => task.id == id);
  }

  public deleteTaskById(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  public updateTaskById(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
