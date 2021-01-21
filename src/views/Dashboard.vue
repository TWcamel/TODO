<template>
    <div id="dashboard">
        <transition name="fade">
            <section>
                <div calss="col1">
                    <div class="profile">
                        <h5>n</h5>
                        <p></p>
                    </div>
                    <div class="create-post">
                        <p>create a todo</p>
                        <form @submit.prevent>
                            <textarea v-model.trim="todo.content"></textarea>
                            <button
                                @click="createTodo()"
                                :disabled="todo.content.length === 0"
                                class="button"
                            >
                                add
                            </button>
                        </form>
                    </div>
                </div>
                <div class="col2">
                    <div v-if="todos.length">
                        <div v-for="todo in todos" :key="todo.id" class="todo">
                            <h5>{{ todo.user.name }}</h5>
                            <p>{{ trimLength(todo.content) }}</p>
                            <ul>
                                <li>Done {{ todo.hadDone }}</li>
                                <li>
                                    <a @click="deleteTodo(todo.id)">Delete</a>
                                </li>
                            </ul>
                            <span>{{ formatDate(todo.createdOn) }}</span>
                        </div>
                    </div>
                    <div v-else>
                        <p class="no-results">There are currently no todos</p>
                    </div>
                </div>
            </section>
        </transition>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex"
import moment from "moment"

export default {
    data() {
        return {
            todo: {
                content: ""
            }
        }
    },
    computed: {
        ...mapState({
            name: state => state.UserState.userProfile,
            todos: state => state.TodoState.todos
        })
    },
    methods: {
        createTodo() {
            this.$store.dispatch("TodoState/createTodo", {
                userProfile: this.name,
                content: this.todo.content
            })
            this.todo.content = ""
        },
        formatDate(val) {
            if (!val) return "-"
            return moment(val.toDate()).fromNow()
        },
        trimLength(val) {
            if (val.length >= 100) return `${val.substring(0, 100)}...`
            else return val
        },
        deleteTodo(id) {
            if (id) this.$store.dispatch("TodoState/deleteTodo", id)
            else (console.error('Cant delete, plz inform author'))
        }
    }
}
</script>