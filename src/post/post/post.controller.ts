import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth/guards/jwt-auth.guards';
import { PostDto } from './dto/post.dto';
import { PostService } from './post.service';

@Controller('post')
@UseGuards(JwtAuthGuard)
export class PostController {

    constructor(
        private readonly postService : PostService
    ){}
    
    @Post('add')
    @ApiTags('Post')
    @ApiBody({type : PostDto})
    addPost(@Req() req : any, @Body() dto : PostDto){
        return this.postService.addPost(req.user.id,dto);   
    }


    @Get('all')
    @ApiTags('Post')
    getAllPost(){
        return this.postService.getAllPost();   
    }


    @Get('/:id')
    @ApiTags('Post')
    getPost(@Param('id') id : string){
        return this.postService.getPostById(id);   
    }


    @Put('/:id/update')
    @ApiTags('Post')
    @ApiBody({type : PostDto})
    updatePost(@Param('id') id : string, @Body() dto : PostDto){
        return this.postService.updatePost(id,dto);   
    }


    @Delete('/:id/delete')
    @ApiTags('Post')
    deletePost(@Param('id') id : string){
        return this.postService.deletePost(id);   
    }


}
