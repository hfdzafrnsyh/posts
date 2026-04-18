import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user/user.entity';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostService {
 
    constructor(
        @InjectRepository(Post)
        private readonly repoPost :  Repository<Post>
    ){}


    async addPost(userId : string, dto : PostDto){

        const saved = await this.repoPost.create({
            user : { id : userId},
            title : dto.title,
            description : dto.description
        });

        await this.repoPost.save(saved);

        return saved;

    }



    async getAllPost(){

        const post = await this.repoPost.find({relations : ['user']})

        const data = {
            status : 'success',
            code : 200,
            data : post
        }

        return data;

    }




    async getPostById(id : string){

        const data = await this.repoPost.findOne({where :{id : id}})


        if(!data){
            throw new NotFoundException('Data not found')
        }


        return data;

    }


    async updatePost(id: string, dto: PostDto) {

        const post = await this.repoPost.findOne({
          where: { id }
        });
      
        if (!post) {
          throw new NotFoundException('Post not found');
        }
      

        let data = {
            title : dto.title,
            description : dto.description
        }

        await this.repoPost.update(id,data);
      
        return data;
      }


      async deletePost(id: string) {
        const result = await this.repoPost.delete(id);
      
        if (result.affected === 0) {
          throw new NotFoundException('Post not found');
        }
      
        return {
          message: 'Post deleted successfully',
        };
      }

}
