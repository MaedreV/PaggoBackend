import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { OcrModule } from './ocr/ocr.module';
import { LlmModule } from './llm/llm.module';

@Module({
  imports: [AuthModule, OcrModule, LlmModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
