import OpenAI from 'openai';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LlmService {
  private openai: OpenAI;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('A key da openAi está em falta');
    }
    this.openai = new OpenAI({ apiKey });
  }

  async askQuestion(prompt: string): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });
    return response.choices[0].message.content;
  }
}
