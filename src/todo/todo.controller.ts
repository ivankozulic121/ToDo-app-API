import { Controller, Get, Post, Patch, Body, ValidationPipe, Param, Delete, UseGuards} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoEntity, TodoStatus } from './entities/todo.entity';
import { TodoStatusValidationPipe } from './pipes/ToDoStatusValidation.pipe';
import { User } from 'src/auth/user.decorator';
import { UserEntity } from 'src/user/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('todo')
@UseGuards(AuthGuard())
export class TodoController {
constructor( private readonly todoService: TodoService) {}

@Get()
getAllTodos(@User() user: UserEntity )  {
    
    console.log(JSON.stringify(user));
    return this.todoService.getAllTodos(user);

}

// za sve ove endpointe za @User decoratorom ocigledno mora da se kreira intereceptor na UI

@Post()
createNewToDo(@Body(ValidationPipe) data: CreateTodoDto, @User() user: UserEntity): Promise<TodoEntity> {

 return this.todoService.createToDo(data, user);

}

@Patch(':id')
updateTodo(@Body('status', TodoStatusValidationPipe) status:TodoStatus, @Param('id') id: number, @User() user:UserEntity) {

    return this.todoService.update(id, status, user)
}

@Delete(':id')
deleteTodo(@Param('id') id:number, @User() user: UserEntity){
    return this.todoService.delete(id,user);
}
  
}
