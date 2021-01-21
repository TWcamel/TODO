<template>
    <header>
        <section>
            <div>
                <router-link class="col1" to="/">
                    <h3>Home</h3>
                </router-link>
                <ul class="inline">
                    <li>
                        <router-link to="/"> Dashboard></router-link>
                    </li>
                </ul>
                <li><a @click="logout()">logout</a></li>
            </div>
        </section>
    </header>
</template>

<script>
export default {
    methods: {
        logout() {
            this.$store.dispatch("UserState/logout")
        }
    }
}
</script>
