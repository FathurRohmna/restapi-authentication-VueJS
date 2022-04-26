import { IUser } from './../../services/apiServices/models/IUser';
import { State } from "./state";

import { UserMutationTypes as MutationTypes } from "./mutation-type";
import Storage from '../../utils/Storage';
import { MutationTree } from 'vuex';
import jwtDecode from 'jwt-decode';

export type Mutations<S = State> = {
  [MutationTypes.SET_USER](state: S, payload: IUser): void
  [MutationTypes.SET_AUTHENTICATION_STATUS](state: S, payload: boolean): void
  [MutationTypes.SET_AUTH_TOKEN](state: S, payload: string): void,
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_USER](state: State, user: IUser) {
    state.user = user
  },
  [MutationTypes.SET_AUTHENTICATION_STATUS](state: State, authenticated: boolean) {
    state.isAuthenticated = authenticated
  },
  [MutationTypes.SET_AUTH_TOKEN](state: State, token: string) {
    state.authToken = token
  }
}
