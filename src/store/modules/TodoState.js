import store from ".."
import * as fb from "@/firebase.js"

const state = {
    todos: {}
}

const mutations = {
    setTodos(state, val) {
        state.todos = val
    }
}

const actions = {
    async createTodo({ state, commit }, todo) {
        await fb.todosCollection.add({
            createdOn: new Date(),
            content: todo.content,
            userId: fb.auth.currentUser.uid,
            user: todo.userProfile,
            hadDone: false
        })
    },

    async deleteTodo({ state, commit }, _id) {
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
    }
}

const updateSetTodos = fb.todosCollection
    .orderBy("createdOn", "desc")
    .onSnapshot(snapshot => {
        let todosArr = []

        snapshot.forEach(doc => {
            let todo = doc.data()
            todo.id = doc.id

            todosArr.push(todo)
        })

        store.commit("TodoState/setTodos", todosArr)
    })

export default {
    namespaced: true,
    state,
    actions,
    mutations
}

export { updateSetTodos }
