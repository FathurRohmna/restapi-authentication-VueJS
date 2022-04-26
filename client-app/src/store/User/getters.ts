import { RootState } from './../index';
import { GetterTree } from 'vuex';
import { IUser } from './../../services/apiServices/models/IUser';
import { State } from "./state"

export type Getters = {
  getUserData(state: State): IUser
  getAuthenticatedStatus(state: State): boolean
}

export const getters: GetterTree<State, RootState> & Getters = {
  getUserData: (state) => state.user,
  getAuthenticatedStatus: (state) => state.isAuthenticated,
}
