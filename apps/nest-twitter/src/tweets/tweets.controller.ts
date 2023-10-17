import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Req,
  Request,
  Session,
  UseGuards,
} from '@nestjs/common'
import { TweetsService } from './tweets.service'
import { AuthGuard } from '@/auth/auth.guard'
import { CreateTweetDto } from './dto/create-tweet.dto'
import { Tweet } from './entities/tweets.entity'
import { AllTweets } from 'api-types'
import { ToggleLikeDto } from './dto/toggle-like.dto'

@UseGuards(AuthGuard)
@Controller('tweets')
export class TweetsController {
  constructor(private readonly tweetsService: TweetsService) { }

  @Get('/')
  async getAll(): Promise<AllTweets[]> {
    return await this.tweetsService.getAll()
  }

  @Post('create')
  async creae(@Body() data: CreateTweetDto, @Request() req): Promise<AllTweets> {
    return this.tweetsService.store(data, req.user.user)
  }

  @Post('toggleLike')
  async toggleLike(@Body() data:ToggleLikeDto , @Request() req) {
    return this.tweetsService.toggleTweetLike(data.id ,req.user.user.id )
  }
}
