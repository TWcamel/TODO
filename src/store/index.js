import Vue from "vue"
import Vuex from "vuex"

import UserState from "./modules/UserState.js"
import TodoState from "./modules/TodoState.js"

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        UserState,
        TodoState
    },
    strict: process.env.NODE_ENV !== "production"
})

export default store
