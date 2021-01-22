<template>
    <div id="dashboard">
        <transition name="fade">
            <section>
                <div calss="col1">
                    <div class="profile">
                        <h3>{{ userProfile.name }}</h3>
                        <hr />
                        <p>🏫 {{ userProfile.title }}</p>
                    </div>
                    <div class="create-todo">
                        <p>create a TODO task</p>
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
                            <input
                                class="todoChkBox"
                                type="checkbox"
                                @click="doneTheTodo(todo.id)"
                            />
                            <label
                                v-if="todo.haddone"
                                :id="`input-${todo.id}`"
                                :style="{
                                    'text-decoration': 'line-through',
                                    'word-break': 'break-all'
                                }"
                                >{{ todo.content }}</label
                            >
                            <label
                                v-else
                                :id="`input-${todo.id}`"
                                :style="{
                                    'word-break': 'break-all'
                                }"
                                >{{ todo.content }}</label
                            >
                            <ul>
                                <li v-if="todo.content.length >= 50">
                                    <a
                                        :id="`moreTodo-${todo.id}`"
                                        class="moreTodo"
                                        @click="
                                            toggleShowMoreTodoContent(
                                                todo.content,
                                                todo.id
                                            )
                                        "
                                        >hide</a
                                    >
                                </li>
                                <li>
                                    <a
                                        class="deleteTodo"
                                        @click="deleteTodo(todo.id)"
                                        >delete</a
                                    >
                                </li>
                            </ul>
                            <span>{{ formatDate(todo.createdOn) }}</span>
                        </div>
                    </div>
                    <div v-else>
                        <h5 class="no-results">There are currently no todos</h5>
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
            userProfile: state => state.UserState.userProfile,
            todos: state => state.TodoState.todos
        })
    },
    methods: {
        createTodo() {
            this.$store.dispatch("TodoState/createTodo", {
                userProfile: this.userProfile,
                content: this.todo.content
            })
            this.todo.content = ""
        },
        formatDate(val) {
            if (!val) return "-"
            return moment(val.toDate()).fromNow()
        },
        deleteTodo(val) {
            if (val) this.$store.dispatch("TodoState/deleteTodo", val)
            else console.error("Cant delete, plz inform author")
        },
        doneTheTodo(val) {
            this.$store.dispatch("TodoState/doneTheTodo", {
                todos: this.todos,
                todo_id: val
            })
            document
                .getElementById(`input-${val}`)
                .style.setProperty("text-decoration", "line-through")
        },
        toggleShowMoreTodoContent(val, id) {
            let moreBtnText = document.getElementById(`moreTodo-${id}`)
            moreBtnText.innerText =
                moreBtnText.innerText.indexOf("more") === 0 ? "hide" : "more"

            let todoContent = document.getElementById(`input-${id}`)
            todoContent.innerText =
                moreBtnText.innerText === "hide"
                    ? val
                    : `${val.slice(0, 50)} ...`
        }
    }
}
</script>
