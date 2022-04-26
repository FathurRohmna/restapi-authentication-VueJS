import { HttpException } from "./httpException";

export class WrongCredentials extends HttpException {
  constructor() {
    super(400, `Wrong Credentials usernamae/password`)
  }
}