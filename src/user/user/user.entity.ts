import { Post } from "src/post/post/post.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn("uuid")
    id : string;

    @Column()
    name : string;


    @Column({unique : true})
    email : string;

    @Column({ select: false })
    password : string;


    @OneToMany(() => Post , (post) => post.user,{
        nullable : true
    })
    posts : Post[]

}