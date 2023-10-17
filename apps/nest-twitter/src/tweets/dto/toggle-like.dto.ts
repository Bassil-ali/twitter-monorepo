import { IsExists } from '@/shared/valdation/IsExists.decorator'
import { Tweet } from '../entities/tweets.entity'
import { TweetsModule } from '../tweets.module'
import { IsNumber } from 'class-validator'

export class ToggleLikeDto {
  @IsExists(Tweet)
  @IsNumber()
  id: number
}
