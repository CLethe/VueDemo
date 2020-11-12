<template>
<!--    监听submit事件，然后调用onSubmit这个方法，而prevent是会调用event.preventDefault(),这里的作用是提交不刷新页面-->
    <form @submit.prevent="onSubmit">
        <h2 class="label-wrapper">
            <label for="new-todo-input">
                what needs to be done?
            </label>
        </h2>
        <!-- v-model.trim:去除输入框前后的空格 -->
        <input type="text" id="new-todo-input"
               name="new-todo" autocomplete="off"
                v-model.trim="label" class="input__lg">
        <button type="submit" class="btn btn__primary btn__lg">add</button>
    </form>
</template>

<script>
    export default {
        name: "ToDoForm",
        methods: {
            onSubmit() {
                if (this.label === "") return;
                // console.log("form submitted", this.label)
                // $emit是子组件触发父组件的事件，即这里会触发父组件中的todo-added这个事件,并且将label传过去
                this.$emit("todo-added", this.label);
                this.label="";
            }
        },
        data() {
            return {
                label: ""
            }
        }
    }
</script>

<style scoped>

</style>