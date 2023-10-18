import { Inject, Injectable, Req } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Tweet } from './entities/tweets.entity'
import { Repository } from 'typeorm'
import { CreateTweetDto } from './dto/create-tweet.dto'
import { AllTweets } from 'api-types'
import { User } from '@/users/entities/user.entity'

@Injectable()
export class TweetsService {
  constructor(
    @InjectRepository(Tweet) private tweetRepostory: Repository<Tweet>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }
  async getAll(): Promise<AllTweets[]> {
    //@ts-ignore
    return await this.tweetRepostory.find({
      relations: {
        user: true,
        likes:true
      },
      select: {
        user: {
          id: true,
          name: true,
          username: true,
        },
        likes: {
          id:true
        }
      },
    })
  }

  async store(data: CreateTweetDto, user: any): Promise<AllTweets> {
    const tweetClone = this.tweetRepostory.create({
      content: data.content,
      user: user.id,
    })

    const tweet = await this.tweetRepostory.save(tweetClone)
    //@ts-ignore
    return await this.tweetRepostory.findOneOrFail({
      where: {
        id: tweet.id,
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

  async toggleTweetLike(tweetId: number, userId: number) {
    const tweet = await this.tweetRepostory.findOne({
      where: {
        id: tweetId,
      },
      relations: {
        likes: true,
      },
    })

    if (!tweet) {
      return
    }

    const likedUser = tweet.likes.find(u =>u.id == userId)

    if (likedUser) {
      tweet.likes = tweet.likes.filter(user => user.id != userId)
    }
    else {
      const user = await this.userRepository.findOneBy({id:userId})
      if(user) {
        tweet.likes = [...tweet.likes , user]
      }
    }

    await this.tweetRepostory.save(tweet)
  }
}
