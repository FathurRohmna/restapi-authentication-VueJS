import { UserService } from './../user/user.service'
import { LoginDto } from './dto/authentication-login.dto'

import argon2 from 'argon2'
import CryptoJS from 'crypto-js'
import { WrongCredentials } from 'common/exceptions/WrongCredentials.exception'
import { Prisma } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { UserNotFound } from 'common/exceptions/UserNotFound.exception';

export class AuthService {
  private readonly userService = new UserService

  async validateUserCredentials(data: LoginDto) {
    const findUser = await this.userService.getUserByEmail(data.email);

    if (!findUser) {
      throw new UserNotFound(data.email)
      return
    }

    if (!(await argon2.verify(findUser.password, data.password))) {
      throw new WrongCredentials()
      return
    }

    return findUser
  }

  login(user: any) {
    const expiresIn = 60 * 60 * 24 * 7 // 7 Days
    const secret = process.env.JWT_SECRET

    const payload = { userId: user.userId }
    const refreshId = user.userId + secret

    const hash = CryptoJS.AES.encrypt(refreshId, process.env.SECRET_CRYPTO)

    const token = jwt.sign(payload, secret, { expiresIn })

    const data = {
      user: user,
      token: token,
      refreshToken: hash.toString(),
      expiresIn: expiresIn
    }

    return data
  }
}
