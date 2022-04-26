import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { Controller } from 'common/interfaces/controller.interface'

export class App {
  public app: express.Application

  constructor(controllers: Controller[]) {
    this.app = express()

    this.initializeMiddlewares()
    this.initializeControllers(controllers)
  }

  public listen() {
    this.app.listen(process.env.PORT || 5000, () => {
      console.log(`App listening on the port ${process.env.PORT || 5000}`);
    })
  }

  public getServer() {
    return this.app
  }

  initializeMiddlewares() {
    this.app.use(express.json())
    this.app.use(cookieParser())
    this.app.use(cors())
  }

  initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router)
    })
  }
}
