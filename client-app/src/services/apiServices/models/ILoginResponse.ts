import { IUser } from './IUser'

export interface ILoginResponse {
  user: IUser
  token: string
  refreshToken: string
  expiresIn: number
}
