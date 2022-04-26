import argon2 from 'argon2'

import { CreateUserDto } from './dto/create.user.dto'
import repository from '../common/prisma/repository'
import { UserAlreadyExists } from 'common/exceptions/UserAlreadyExists.exception'

export class UserService {
  async createUser(data: CreateUserDto) {
    const checkExistanceEmail = await this.getUserByEmail(data.email)

    if (checkExistanceEmail) {
      throw new UserAlreadyExists(data.email)
    }

    const hash = await argon2.hash(data.password)

    const user = await repository.user.create({
      data: { ...data, password: hash }
    })

    return user
  }

  async getUserByEmail(email: string) {
    const user = await repository.user.findUnique({
      where: {
        email: email
      }
    })

    return user
  }

  async getUserById(id: string) {
    const user = await repository.user.findMany({
      where: {
        userId: id
      }
    })

    return user
  }

  async getUserByUserName(username: string) {
    const user = await repository.user.findUnique({
      where: {
        username: username
      }
    })
  }
}