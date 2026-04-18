import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService : AuthService,
        private configService : ConfigService,
        private readonly jwtService : JwtService
    ){}


    @Post('register')
    @ApiOperation({summary : 'User Register'})
    @ApiBody({type : RegisterDto})
    register(@Body() dto : RegisterDto){
        return this.authService.register(dto)
    }

    @Post('login')
    @ApiOperation({summary : 'User Login'})
    @ApiBody({type : LoginDto})
    login(@Body() dto : LoginDto){
        return this.authService.login(dto)
    }

    
}
