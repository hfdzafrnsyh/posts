import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import type { Response } from 'express';


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
    async login(
        @Body() dto: LoginDto,
        @Res({ passthrough: true }) res: Response
      ) {

        const login = await this.authService.login(dto)
      
        res.cookie('access_token', login.access_token, {
          httpOnly: true,
          secure: false,
          sameSite: 'lax',
          maxAge: 1000 * 60 * 60
        })
      
        return {
          message: 'Login success',
          access_token : login.access_token
        }
      }



    @Post('logout')
      async logout(
        @Res({ passthrough: true }) res: Response
      ) {

      
        res.clearCookie('access_token', {
          httpOnly: true,
          secure: false,
          sameSite: 'lax',
          maxAge: 1000 * 60 * 60
        })
      
        return {
          message: 'Logout success',
        }
      }

    
}
