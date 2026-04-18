import { User } from "src/user/user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('posts')
export class Post{

    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column()
    title : string;

    @Column()
    description : string;

    @ManyToOne(() => User, (user) => user.posts )
    user : User


}