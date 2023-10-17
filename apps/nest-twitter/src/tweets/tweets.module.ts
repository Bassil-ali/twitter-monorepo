import { Module } from '@nestjs/common';
import { TweetsController } from './tweets.controller';
import { TweetsService } from './tweets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweet } from './entities/tweets.entity';
import { TweetLike } from './entities/tweet-like';

@Module({
  imports:[TypeOrmModule.forFeature([Tweet , TweetLike])],
  controllers: [TweetsController],
  providers: [TweetsService]
})
export class TweetsModule {}
