import { JwtMiddleware } from "auth/middleware/jwt.middleware";
import { Controller } from "common/interfaces/controller.interface";
import { Router, Request, Response } from "express";

export class PirvateController implements Controller {
  public router = Router()
  public path = '/api'

  private jwtMiddleware = new JwtMiddleware

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/private`, this.jwtMiddleware.validationJwtToken, this.handleRequestPrivateRouter)
  }

  handleRequestPrivateRouter = (req: Request, res: Response) => {
    res.status(200).json({  data: 'Private Route' })
  }
}