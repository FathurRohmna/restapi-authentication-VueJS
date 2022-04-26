import { GetUserById, UserLogin, UserRegister } from './../../services/apiServices/UserApiService';
import { Mutations } from './mutations';
import { RootState } from './../index';
import { ActionContext, ActionTree } from "vuex";
import { UserActionTypes } from "./action-types";
import { State } from "./state";

import Storage from '../../utils/Storage';
import { UserMutationTypes } from './mutation-type';
import jwtDecode from 'jwt-decode';
import { IUser } from '../../services/apiServices/models/IUser';
import IUserLoginRequestParams from '../../services/apiServices/models/IUserLoginRequestParams';
import IUserRegisterRequestParams from '../../services/apiServices/models/IUserRegiterRequestParas';

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, RootState>, 'commit'>

export interface Actions {
  [UserActionTypes.LOGIN_AUTHENTICATION]({ commit }: AugmentedActionContext, dataPayload: IUserLoginRequestParams): void
  [UserActionTypes.REGISTER_AUTHENTICATION]({ commit }: AugmentedActionContext, dataPayload: IUserRegisterRequestParams): void
  [UserActionTypes.GET_USER_DATA]({ commit }: AugmentedActionContext): void
}

export const tokenStorage = new Storage<string>('sb-token-access')

export const actions: ActionTree<State, RootState> & Actions = {
  async [UserActionTypes.LOGIN_AUTHENTICATION]({ commit }, data: IUserLoginRequestParams) {
    try {
      const res = await UserLogin(data)

      commit(UserMutationTypes.SET_AUTH_TOKEN, res.data.token)
      commit(UserMutationTypes.SET_AUTHENTICATION_STATUS, true)
      commit(UserMutationTypes.SET_USER, res.data.user)

      tokenStorage.set(res.data.token)

      return res.data
    } catch (error) {
      return { error }
    }
  },
  async [UserActionTypes.REGISTER_AUTHENTICATION]({ commit}, data: IUserRegisterRequestParams) {
    try {
      const res = await UserRegister(data)

      commit(UserMutationTypes.SET_AUTH_TOKEN, res.token)
      commit(UserMutationTypes.SET_AUTHENTICATION_STATUS, true)
      commit(UserMutationTypes.SET_USER, res.user)

      tokenStorage.set(res.data.token)

      return res
    } catch (error) {
      return { error }
    }
  },
  async [UserActionTypes.GET_USER_DATA]({ commit }) {
    const token = tokenStorage.get()

    if (token) {
      const { userId }: any = jwtDecode(token)

      if (userId) {
        const res = await GetUserById(userId)

        commit(UserMutationTypes.SET_USER, {
          ...res.data[0]
        })

        commit(UserMutationTypes.SET_AUTH_TOKEN, token)
        commit(UserMutationTypes.SET_AUTHENTICATION_STATUS, true)
      } else {
        tokenStorage.remove()
      }
    } else {
      commit(UserMutationTypes.SET_USER, {
        userId: '',
        username: '',
        email: ''
      })
      commit(UserMutationTypes.SET_AUTHENTICATION_STATUS, false)
      commit(UserMutationTypes.SET_AUTH_TOKEN, '')
    }
  }
}