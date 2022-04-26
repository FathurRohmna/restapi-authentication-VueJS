import { JwtMiddleware } from "auth/middleware/jwt.middleware";
import { Controller } from "common/interfaces/controller.interface";
import { Router, Response, Request } from "express";
import { UserService } from "./user.service";

export class UserController implements Controller {
  public path = '/api'
  public router = Router()

  public userService = new UserService()
  public jwtMiddleware = new JwtMiddleware()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/user/:userId`, this.jwtMiddleware.validationJwtToken, this.getUserById)
  }

  getUserById = async (req: Request, res: Response) => {
    try {
      const user = await this.userService.getUserById(req.params.userId);

      res.status(200).json({ data: user })
    } catch (error) {
      res.status(400).send({ error_msg: 'Some thing error' })
    }
  }
}