import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity, TodoStatus } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class TodoService {

constructor(@InjectRepository(TodoEntity) private repo: Repository<TodoEntity>){}
    
async getAllTodos(user: UserEntity) : Promise<TodoEntity[]>{
        
        const query = await this.repo.createQueryBuilder('todo')
        query.where({user});

        try {
            return await query.getMany();
        }
        catch(err) {

            throw new NotFoundException('No todo found');
        }
    
    }

async createToDo( createTodoDto: CreateTodoDto, user: UserEntity) {

    const todo: TodoEntity = new TodoEntity();
    const { title, description } = createTodoDto
    todo.title = title;
    todo.description = description;
    todo.status = TodoStatus.OPEN;
    //todo.user.id = user.id
    todo.user = user;

    this.repo.create(todo)
    try {
        const jsonResponse = this.repo.save(todo);
        return await jsonResponse;
      } catch (err) {
        console.log(err.stack);
        throw new InternalServerErrorException('Something went wrong, todo not created');
  
      }
  
}

async update(id: number, status: TodoStatus, user: UserEntity) {
    try {
        await this.repo.update({id, user}, {status});
        return this.repo.findOneBy({id});
      } catch (err) {
        throw new InternalServerErrorException('Something went wrong');
      }
  
    
}

async delete(id: number, user: UserEntity) {

    const result = await this.repo.delete({id,  user
    })

    if (result.affected == 0){
        throw new NotFoundException('Todo not deleted.');
    }
    else{
        return { success:true, user: user.username   };
    return await this.repo.delete({id});
}
}
}
