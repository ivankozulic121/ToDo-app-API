import { UserEntity } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('todos')
export class TodoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @ManyToOne(()=> UserEntity, user => user.todo, { eager:false})
    user: UserEntity

    @Column()
    status: TodoStatus;

    
}

export enum TodoStatus {
//ovdje se i brojevi mogu korisiti za vrijednosti
    OPEN = 'OPEN',
    WIP = 'WIP', // work in progress
    COMPLETED = 'COMPLETED'

}