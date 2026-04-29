import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
    private readonly userRepo : Repository<User>,
    ){}


    async findByEmail(email: string) {
       const user = await this.userRepo.findOne({ where: { email },relations : ['posts'] });

       if(!user){
        throw new NotFoundException('User not found')
       }

        return user;
      }
    
     async findById(id: string) {
        
      
       const user = await this.userRepo.findOne({ 
        where: { id },
        relations : ['posts'] 
      });

       if(!user){
        throw new NotFoundException('User not found')
       }
         

        return user;
      }


      async findAll(){

        const user = await this.userRepo.find({relations : ['posts']});

        const data = {
          status : 'success',
          code : 200,
          data : user
        }

        return data;
      }

}
