import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { tokenStorage } from "../../store/User/actions";
import HttpStatusCode from '../common/HttpStatusCode';

const AuthInterceptor = (config: any): AxiosRequestConfig => {
  const accessToken = tokenStorage.get()

  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`

  return config
}

const OnResponseSuccess = (response: AxiosResponse<any>): AxiosResponse<any> => response

const OnResponseFailure = (error: any): Promise<any> => {
  const httpStatus = error?.response?.status

  const errors = error?.response?.data?.error_msg
  const isUnknownError = errors?.[0].startsWith("Unknown")

  switch(httpStatus) {
    case HttpStatusCode.UNAUTHORIZED:
      console.log('You are not logged in, please login')
      break
    case HttpStatusCode.FORBIDDEN:
      console.log('Access to this resource is forbidden')
      break
    case HttpStatusCode.BADREQUEST:
      console.log('Bad Request')
      break
    default:
      console.log('Unknown error occurred, please try again later.')
      break
  }

  return Promise.reject(errors)
}

const instance: Readonly<AxiosInstance> = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 5000
})

instance.defaults.headers.get.Accepts = 'application/json'
instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

instance.interceptors.request.use(AuthInterceptor)

instance.interceptors.response.use(OnResponseSuccess, OnResponseFailure)

export default instance
