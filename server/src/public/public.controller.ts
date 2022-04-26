import { Controller } from 'common/interfaces/controller.interface';
import { Router, Request, Response } from 'express';

export class PublicController implements Controller {
  public router = Router()
  public path = '/api'

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.all(`${this.path}/public`, this.handleAllRequest)
  }

  handleAllRequest = (req: Request, res: Response) => {
    console.log(process.env.SECRET_CRYPTO);
    res.status(200).json({ data: 'Public Route', methods: req.method })
  }
}