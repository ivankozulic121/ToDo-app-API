import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TodoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TodoStatus;
}

export enum TodoStatus {
//ovdje se i brojevi mogu korisiti za vrijednosti
    OPEN = 'OPEN',
    WIP = 'WIP', // work in progress
    COMPLETED = 'COMPLETED'

}