import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { OcrService } from './ocr.service';


@Controller('ocr')
export class OcrController {
  constructor(private ocrService: OcrService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const text = await this.ocrService.processImage(file.buffer);
    return { text };
  }
}
