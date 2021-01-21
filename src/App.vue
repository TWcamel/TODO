<template>
    <div id="app">
        <nav-bar v-show="showNav" />
        <router-view />
    </div>
</template>

<script>
import { mapState } from "vuex"
import NavBar from "./components/NavBar.vue"

export default {
    name: "App",
    components: { NavBar },
    computed: {
        ...mapState({ userProfile: state => state.UserState.userProfile }),
        showNav() {
            return Object.keys(this.userProfile).length > 1
        }
    },
    // created() {
    //     console.log(this.showNav)
    // }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
