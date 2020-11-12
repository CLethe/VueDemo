<template>
    <form @submit.prevent="onSubmit">
        <input type="text" placeholder="username" name="username" v-model="user.username">
        <input type="password" placeholder="password" name="password" v-model="user.password">
        <input type="submit">
    </form>
</template>

<script>
    import axios from "axios"
    export default {
        name: "UserLogin",
        data() {
          return {
              user: {
                  username: "",
                  password: ""
              }
          }
        },
        methods: {
            onSubmit() {
                console.log(this.user);
                axios.post("http://localhost:8080/login1", this.user).then(re => console.log(re))
            }
        }
    }
</script>

<style scoped>

</style>