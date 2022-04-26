import instance from "./BaseApiService"
import { ILoginResponse } from "./models/ILoginResponse"
import { IUser } from "./models/IUser"
import IUserLoginRequestParams from "./models/IUserLoginRequestParams"
import IUserRegisterRequestParams from "./models/IUserRegiterRequestParas"

const AUTHENTICATION_PATH = '/api'

export const UserLogin = async (data: IUserLoginRequestParams) => {
  const req = await instance.post(`${AUTHENTICATION_PATH}/login`, data)

  return req.data
}

export const UserRegister = async (data: IUserRegisterRequestParams) => {
  const req = await instance.post(`${AUTHENTICATION_PATH}/register`, data)

  return req.data
}

export const RefreshToken = async (refreshToken: string | null) => {
  const req = await instance.post(`${AUTHENTICATION_PATH}/refresh-token`, { refresh_token: refreshToken })

  return req.data
}

export const GetUserById = async (id: string) => {
  const req = await instance.get(`${AUTHENTICATION_PATH}/user/${id}`)

  return req.data
}

