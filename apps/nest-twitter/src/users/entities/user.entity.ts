import { BaseEntity } from '@/shared/valdation/entities/BaseEntity'
import { Tweet } from '@/tweets/entities/tweets.entity'
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User extends BaseEntity{
  @Column()
  name: string

  @Column()
  username: string

  @Column()
  email: string

  @Column()
  password: string

  @Column({ default: true })
  isActive: boolean

  @OneToMany(() => Tweet , (Tweet) => Tweet.user  )
  tweets:Tweet[]

  @ManyToMany(() => Tweet , (Tweet) => Tweet.likes , {cascade:true})
  likes:Tweet[]


}
