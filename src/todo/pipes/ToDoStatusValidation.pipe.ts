import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { TodoStatus } from "../entities/todo.entity";



export class TodoStatusValidationPipe implements PipeTransform{
    readonly allowedStatus: TodoStatus[] = [TodoStatus.OPEN, TodoStatus.WIP, TodoStatus.COMPLETED];

    transform(value: any, metadata: ArgumentMetadata): any {
        value = value.toUpperCase();

    if (!this.isStatusValid(value)){
        console.log('EVO JE VRIJEDNOST: ' + value);
        throw new BadRequestException('${value} is an invalid status')
    }
    return value;
    }

private isStatusValid(status: any): boolean{
    const index: number = this.allowedStatus.indexOf(status);
    console.log('EVO GA INDEKS: ' + index);
    return index !== -1;
}
}