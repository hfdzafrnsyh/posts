import { Controller, Get, Param, Query, Req, Res, UseGuards } from '@nestjs/common';
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


    @Get('me')
    @ApiTags('User')
    getUserByEmail(@Req() req : any ){
        return this.userService.findByEmail(req.user.email);
    }

    @Get('/:id')
    @ApiTags('User')
    getUserById(@Param('id') id : string){
        return this.userService.findById(id);
    }

}
