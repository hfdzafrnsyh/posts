import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth/guards/jwt-auth.guards';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
    constructor(
        private readonly userService : UserService
    ){}


    @Get('all')
    @ApiTags('User')
    getAll(){
        return this.userService.findAll();
    }


    @Get()
    @ApiTags('User')
    getUserByEmail(@Query('email') email : string){
        return this.userService.findByEmail(email);
    }

    @Get('/:id')
    @ApiTags('User')
    getUserById(@Param('id') id : string){
        return this.userService.findById(id);
    }

}
