import { HttpException } from './httpException';
export class UserNotFound extends HttpException {
  constructor(email: string) {
    super(404, `User with email ${email} does not exists.`)
  }
}
