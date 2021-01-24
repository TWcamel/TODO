import store from ".."
import * as fb from "../../firebase.js"

const state = {
    todos: {}
}

const mutations = {
    setTodos(state, val) {
        state.todos = val
    }
}

const actions = {
    async createTodo({ state }, todo) {
        await fb.todosCollection.add({
            createdOn: new Date(),
            content: todo.content,
            userId: fb.auth.currentUser.uid,
            user: todo.userProfile,
            hadDone: false
        })
    },

    async deleteTodo({ state }, _id) {
        await fb.todosCollection
            .doc(_id)
            .delete()
            .then()
            .catch(e => console.error(`Error removing document: `, e))
    },

    async doneTheTodo({ commit }, todos) {
        let todo = (await fb.todosCollection.doc(todos.todo_id).get()).data()
        todo.hadDone = !todo.hadDone
        await fb.todosCollection.doc(todos.todo_id).set(todo)
    },

    async fetchUserTodos({ commit }, user) {
        await fb.todosCollection
            .orderBy("createdOn", "desc")
            .onSnapshot(querySnapshot => {
                let userTodoArr = []
                querySnapshot.forEach(doc => {
                    let todo = doc.data()
                    todo.id = doc.id

                    if (todo.userId === user.uid) {
                        userTodoArr.push(todo)
                    }
                })
                commit("setTodos", userTodoArr)
            })
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
