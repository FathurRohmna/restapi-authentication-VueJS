import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import CryptoJS from 'crypto-js';

import { UserService } from './../../user/user.service';

export class JwtMiddleware {
  private readonly userService = new UserService

  validationJwtToken(req: Request, res: Response, next: NextFunction) {
    const bearerHeader = req.headers['authorization']

    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ')
      const bearerToken = bearer[1]

      try {
        const { userId }: any = jwt.verify(bearerToken, process.env.JWT_SECRET)

        if (userId) {
          req.body.userId = userId

          next()
        } else {
          return res.status(403).send('Forbidden')
        }
      } catch (error) {
        return res.status(403).send('Forbidden')
      }
    } else {
      return res.status(401).send('Unauthorized')
    }
  }
}