import Vue from "vue"
import Vuex from "vuex"
import * as fb from "../firebase"
import router from "../router/index"

import UserState from "./modules/UserState"
import TodoState from "./modules/TodoState"

Vue.use(Vuex)

fb.todosCollection.orderBy("createdOn", "desc").onSnapshot(snapshot => {
    let todosArr = []

    snapshot.forEach(ele => {
        let todo = ele.data()
        todo.id = ele.id

        todosArr.push(todo)
    })

    store.commit("TodoState/setTodos", todosArr)
})

const store = new Vuex.Store({
    modules: {
        UserState,
        TodoState
    },
    strict: process.env.NODE_ENV !== "production"
})

export default store
