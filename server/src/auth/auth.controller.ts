import { UserService } from './../user/user.service';
import { Controller } from 'common/interfaces/controller.interface';
import { Request, Router, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/authentication-login.dto';
import { CreateUserDto } from 'user/dto/create.user.dto';
import { validationMiddleware } from './middleware/validation.middleware';

export class AuthController implements Controller {
  public router = Router()
  public path = '/api'

  private userService: UserService = new UserService
  private authService: AuthService = new AuthService

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`, validationMiddleware(CreateUserDto), this.registerUser),
    this.router.post(`${this.path}/login`, validationMiddleware(LoginDto), this.loginUser)
  }

  loginUser = async (req: Request, res: Response) => {
    const userData: LoginDto = req.body

    try {
      const user = await this.authService.validateUserCredentials(userData)
      const tokenData = this.authService.login(user)

      console.log({
        data: { 
          user: user, 
          token: tokenData.token, 
          refreshToken: tokenData.refreshToken, 
          expiresIn: tokenData.expiresIn 
        }
      });


      const responseData = {
        user: user, 
        token: tokenData.token, 
        refreshToken: tokenData.refreshToken, 
        expiresIn: tokenData.expiresIn 
      }

      res.status(200).json({ data: responseData })
    } catch (error) {
      return res.status(400).json({ error_msg: error.message })
    }
  }

  registerUser = async (req: Request, res: Response) => {
    const userData: CreateUserDto = req.body

    try {
      const newUser = await this.userService.createUser(userData)

      const tokenData = this.authService.login(newUser)

      console.log({
        data: { 
          user: newUser, 
          token: tokenData.token, 
          refreshToken: tokenData.refreshToken, 
          expiresIn: tokenData.expiresIn 
        }
      });

      res.status(200).json(
        { 
          data: { 
            user: newUser, 
            token: tokenData.token, 
            refreshToken: tokenData.refreshToken, 
            expiresIn: tokenData.expiresIn 
          }
        }
      )
    } catch (error) {
      return res.status(400).json({ error_msg: error.message })
    }
  }
}