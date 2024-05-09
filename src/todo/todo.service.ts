import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from './entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {

constructor(@InjectRepository(TodoEntity) private repo: Repository<TodoEntity>){}
    
async getAllTodos(): Promise<TodoEntity[]> {
        
        return await this.repo.find();
    }
}
