import { RootState } from './../index';
import { Getters, getters } from './getters';
import { Actions, actions } from './actions';
import { CommitOptions, DispatchOptions, Module, Store as VuexStore } from "vuex";
import { Mutations, mutations } from "./mutations";
import type { State } from "./state";

import { state } from './state';

export { State }

export type UserStore<S = State> = Omit<VuexStore<S>, 'getters' | 'commit' | 'dispatch'> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>
  }
}

export const store: Module<State, RootState> = {
  state,
  mutations,
  getters,
  actions,
  namespaced: true
}