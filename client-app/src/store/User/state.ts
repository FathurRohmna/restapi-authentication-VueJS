import { IUser } from './../../services/apiServices/models/IUser';

export type State = {
  user: IUser
  isAuthenticated: boolean
  authToken: string
}

export const state: State = {
  user: {
    userId: '',
    username: '',
    email: ''
  },
  isAuthenticated: false,
  authToken: ''
}
