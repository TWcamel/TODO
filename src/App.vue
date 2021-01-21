<template>
    <div id="app">
        <nav-bar v-show="showNav" />
        <router-view />
    </div>
</template>

<script>
import { mapState } from "vuex"
import NavBar from "./components/NavBar.vue"
import './assets/scss/app.scss'

export default {
    name: "App",
    components: { NavBar },
    computed: {
        ...mapState({ userProfile: state => state.UserState.userProfile }),
        showNav() {
            return Object.keys(this.userProfile).length > 1
        }
    },
}
</script>
