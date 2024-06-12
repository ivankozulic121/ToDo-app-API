import { IsNotEmpty , MaxLength, IsDate, IsOptional } from "class-validator";

export class CreateTodoDto{
    //validation pipe najvjerovatnije sluzi da ono sto se prosledjuje iz bodyja proslijedi na provjeru na osnovu ovog dtoa
    @IsNotEmpty()
    @MaxLength(15, {message: 'Max length is 15 characters'})
    title: string;

    @IsNotEmpty()
    description: string;

    

}