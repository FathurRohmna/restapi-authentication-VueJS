import { createLogger, createStore } from "vuex"
import createPersistedState from "vuex-persistedstate"

import { UserStore, store as user } from "./User"
import { State as UserState } from "./User/state"

export type RootState = {
  users: UserState
}

export type Store = UserStore<Pick<RootState, 'users'>>

const plugins = [createLogger({})]

plugins.push(createPersistedState({ storage: window.sessionStorage }))

export const store = createStore({
  plugins,
  modules: {
    user
  }
})

export function useStore(): Store {
  return store as Store
}
