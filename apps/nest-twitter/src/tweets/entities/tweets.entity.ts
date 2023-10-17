import { BaseEntity } from '@/shared/valdation/entities/BaseEntity'
import { User } from '@/users/entities/user.entity'
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { TweetLike } from './tweet-like'

@Entity()
export class Tweet extends BaseEntity{
  @Column()
  content: string

  @Column({nullable:true})
  type?: string

  @ManyToOne(() => User , (User) => User.tweets)
  @JoinColumn()
  user:User

  @ManyToMany(() => User , {cascade:true})
  @JoinTable()
  likes:TweetLike[]
}
