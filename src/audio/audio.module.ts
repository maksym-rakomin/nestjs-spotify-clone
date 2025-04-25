import { Module } from '@nestjs/common';
import { AudioController } from './audio.controller';
import { BullModule } from '@nestjs/bull';
import { AudioProcessor } from './audio.processor';

@Module({
  controllers: [AudioController],
  imports: [
    BullModule.registerQueue({
      name: 'audio-queue',
    }),
  ],
  providers: [AudioProcessor],
})
export class AudioModule {}
