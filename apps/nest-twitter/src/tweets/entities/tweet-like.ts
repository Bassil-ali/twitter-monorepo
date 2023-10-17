
import { BaseEntity } from '@/shared/valdation/entities/BaseEntity'
import { User } from '@/users/entities/user.entity'
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class TweetLike extends BaseEntity{

  @ManyToMany(() => User , (User) => User.tweets)
  user:User

}
