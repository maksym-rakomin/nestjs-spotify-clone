import {
  Controller,
  Get,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JWT_AUTH } from './auth/auth.constants';
import { PrismaService } from './prisma.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private prisma: PrismaService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('profile')
  @ApiBearerAuth(JWT_AUTH)
  @UseGuards(JwtAuthGuard)
  getProfile(
    @Req()
    request: Request & { user: { id: number; username: string } },
  ) {
    return request.user;
  }

  @Get('sequential')
  getSequentialResults() {
    return this.prisma.$transaction([
      this.prisma.post.findMany(),
      this.prisma.videoArtist.findMany(),
      this.prisma.video.findMany(),
      this.prisma.application.findMany(),
    ]);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }

  // only want to accept png file
  @Post('upload-png')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload/files',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  uploadPngFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'png',
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);
    return {
      message: 'file uploaded successfully!',
    };
  }

  @Get('set-cookie')
  setCookie(
    @Res({ passthrough: true })
    response: Response,
  ) {
    response.cookie('token', 'encrypted cookie string');
    response.send('Cookie Saved Successfully');
  }

  @Get('get-cookie')
  findAll(@Req() req: Request) {
    console.log(req.cookies);
    return req.cookies;
  }
}
