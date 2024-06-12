import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { TodoEntity } from 'src/todo/entities/todo.entity';
@Entity('userss')

export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @OneToMany(()=> TodoEntity, todo => todo.user, { eager: true } )
    todo: TodoEntity[]

    @Column()
    salt: string;

    /* ovo nek isto stoji zakomentariseno jer bcrypt izgleda ne radi kako treba, nisam siguran
    async verifyPassword(password: string){

        /*const hash = await bcrypt.hash(password, this.salt)
        return hash === this.password;
    
        return await bcrypt.compare(password, this.password)
    
    }*/

}

