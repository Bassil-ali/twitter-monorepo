import { Inject, Injectable, Req } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Tweet } from './entities/tweets.entity'
import { Repository } from 'typeorm'
import { CreateTweetDto } from './dto/create-tweet.dto'
import { AllTweets } from 'api-types'
import { User } from '@/users/entities/user.entity'
import { TweetLike } from './entities/tweet-like'

@Injectable()
export class TweetsService {
  constructor(
    @InjectRepository(Tweet) private tweetRepostory: Repository<Tweet>,
  ) { }
  async getAll():Promise<AllTweets[]> {
    //@ts-ignore
    return await this.tweetRepostory.find({
      relations: {
        user: true,
      },
      select: {
        user: {
          id: true,
          name: true,
          username: true,
        },
      },
    })
  }

  async store(data: CreateTweetDto, user: any): Promise<AllTweets> {
    const tweet = await this.tweetRepostory.save({
      content: data.content,
      user: user.id,
    }  )
    //@ts-ignore
    return await this.tweetRepostory.findOneOrFail({
      where: {
        id:tweet.id
      },
      relations: {
        user: true,
      },
      select: {
        user: {
          id: true,
          name: true,
          username: true,
        },
      },
    })
  }

  async toggleTweetLike(tweetId:number , userId: number) {
    const tweet = await this.tweetRepostory.findOneBy({id:tweetId})

    const a = new TweetLike()
    // a.user


    if(tweet) {
      // tweet.likes = userId
    }


  }
}
