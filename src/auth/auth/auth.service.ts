import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from "bcrypt";
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo : Repository<User>,
        private readonly jwtService : JwtService
    ){}



    async register(dto : RegisterDto){

        const user = await this.userRepo.findOne({
            where : {email : dto.email}
        })

        if(user) throw new BadRequestException('Email already registered');
        

        const hashed = await bcrypt.hash(dto.password,10);

        //create user 
        const newUser = await this.userRepo.create({
            name : dto.name,
            email : dto.email,
            password : hashed,
        });


        //save user 
        await this.userRepo.save(newUser);

        return this._createToken(newUser.id, newUser.email);

    }



    async login(dto : LoginDto){

        const user = await this.userRepo.findOne({where : { email : dto.email},select: ['id','email','password']});

        if(!user)  {
            throw new UnauthorizedException('User not found');
        }

       
      let passwordSame = await bcrypt.compare(dto.password, user.password);
       
        if(!passwordSame){


            throw new UnauthorizedException('Password not same');
        }


        

        return this._createToken(user.id,user.email);

    }

  private _createToken(userId : string, email : string) : {access_token : string}{
        const payload = {sub : userId, email}

        return { access_token : this.jwtService.sign(payload)}
  }  

}
