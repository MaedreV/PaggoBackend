import { BadRequestException, Controller, Get, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { OcrService } from './ocr.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Controller('ocr')
export class OcrController {
  constructor(
    private ocrService: OcrService,
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    if (!file) {
      throw new BadRequestException('Arquivo em falta');
    }
    // processa a imagem e extrai o texto
    const text = await this.ocrService.processImage(file.buffer);

    const authToken = req.headers.authorization?.split(' ')[1];
    if (!authToken) {
      throw new BadRequestException('Token faltando ou invalido');
    }
    const decodedToken = this.jwtService.verify(authToken);
    const userId = decodedToken.sub;
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException('Usuario não encontrado');
    }
    await this.prisma.document.create({
      data: { content: text, userId: user.id },
    });
    
    return { text }; 
  }

  @Get('documents')
  async getDocuments(@Req() req: Request) {
    const authToken = req.headers.authorization?.split(' ')[1];
    if (!authToken) {
      throw new BadRequestException('Token faltando ou invalido');
    }
  
    const decodedToken = this.jwtService.verify(authToken);
    const userId = decodedToken.sub;
  
    const documents = await this.prisma.document.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }, 
    });
  
    return documents;
  }
  
}
