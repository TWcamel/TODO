<template>
    <div id="login">
        <password-reset v-if="showPasswordReset" @close="togglePasswordReset" />
        <section>
            <div class="col1">
                <h1>TODO-list app</h1>
                <p>
                    Welcome to the
                    <a>TODO-list App</a>
                    simple web app powered by Vue.js and Firebase. Build this
                    project by checking out The Definitive Guide with Vue.js.
                </p>
                <p>
                    This is a lightweight web app that enables you to
                    have personal todos and it's easy to read. In constructing,
                    this app features:
                </p>
                <ul>
                    <li>
                        Manage state for the app using Vuex with central store
                        concept which is important for building large-scale
                        apps.
                    </li>
                    <li>
                        Leverage component with authenticated routes by using
                        vue-router.
                    </li>
                    <li>
                        Read/write to a database using Firebase's Cloud
                        Firestore.
                    </li>
                    <li>Set up authentication using Firebase.</li>
                </ul>
                <span class="constructingTag"
                    ><a>Vuex</a> <a>Components</a> <a>Firebase</a>
                    <a>Cloud Firestore</a> <a>Vue built-in function</a>
                    <a>scss</a>
                </span>
            </div>
            <div :class="{ 'signup-form': !showLoginForm }" class="col2">
                <form v-if="showLoginForm" @submit.prevent>
                    <h1>Welcome Back to TODO-list app</h1>
                    <div>
                        <label for="email1">Email</label>
                        <input
                            v-model.trim="loginForm.email"
                            type="text"
                            placeholder="your@email.com"
                            id="email1"
                        />
                    </div>
                    <div>
                        <label for="password1">Password</label>
                        <input
                            v-model.trim="loginForm.password"
                            type="password"
                            placeholder="******"
                            id="password1"
                        />
                    </div>
                    <button @click="login()" class="button">Log In</button>
                    <div class="extras">
                        <a @click="toggleForm()">Create an Account</a>
                        <a @click="togglePasswordReset()">Forgot Password</a>
                    </div>
                </form>

                <form v-else @submit.prevent>
                    <h1>Get Started</h1>
                    <div>
                        <label for="name">Name</label>
                        <input
                            v-model.trim="signupForm.name"
                            type="text"
                            placeholder="Savvy Apps"
                            id="name"
                        />
                    </div>
                    <div>
                        <label for="title">Title</label>
                        <input
                            v-model.trim="signupForm.title"
                            type="text"
                            placeholder="Company"
                            id="title"
                        />
                    </div>
                    <div>
                        <label for="email2">Email</label>
                        <input
                            v-model.trim="signupForm.email"
                            type="text"
                            placeholder="your@email.com"
                            id="email2"
                        />
                    </div>
                    <div>
                        <label for="password2">Password</label>
                        <input
                            v-model.trim="signupForm.password"
                            type="password"
                            placeholder="min 6 characters"
                            id="password2"
                        />
                    </div>
                    <button @click="signup()" class="button">Sign Up</button>
                    <div class="extras">
                        <a @click="toggleForm()">Back to Log In</a>
                    </div>
                </form>
                <h5 class="signInBanner">Sign in to continue, make your time more productive</h5>
            </div>
        </section>
    </div>
</template>

<script>
import PasswordReset from "../components/PasswordReset.vue"

export default {
    components: { PasswordReset },
    data() {
        return {
            loginForm: {
                email: "",
                password: ""
            },
            signupForm: {
                name: "",
                title: "",
                email: "",
                password: ""
            },
            showLoginForm: true,
            toggleForm() {
                this.showLoginForm = !this.showLoginForm
            },
            showPasswordReset: false
        }
    },
    methods: {
        login() {
            this.$store.dispatch("UserState/login", {
                email: this.loginForm.email,
                password: this.loginForm.password
            })
        },
        signup() {
            this.$store.dispatch("UserState/signup", {
                name: this.signupForm.name,
                title: this.signupForm.title,
                email: this.signupForm.email,
                password: this.signupForm.password
            })
        },
        togglePasswordReset() {
            this.showPasswordReset = !this.showPasswordReset
        }
    }
}
</script>
