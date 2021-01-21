import Vue from "vue"
import Vuex from "vuex"
import * as fb from "../firebase"
import router from "../router/index"

import UserState from "./modules/UserState"
import TodoState from "./modules/TodoState"

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        UserState,
        TodoState
    },
    strict: process.env.NODE_ENV !== "production"
})

export default store
