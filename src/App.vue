<template>
    <div id="app">
        <!--    <img alt="Vue logo" src="./assets/logo.png">-->
        <!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
        <h1>To-Do List</h1>
<!--        使用ToDoForm这个组件，并且监听了了todo-added这个自定义事件-->
        <ToDoForm @todo-added="addToDo"></ToDoForm>
        <h2 id="list-summary">{{listSummary}}</h2>
        <ul aria-labelledby="list-summary" class="stack-large">
<!--            :key是为了保证每个元素的唯一性-->
            <li v-for="item in ToDoItems" :key="item.id">
<!--                使用了ToDoItem这个组件，并且绑定了自定义attribute （:），监听了自定义事件（@）-->
<!--                如果监听的事件对方没有传递参数，则此方没有限制，
                    如果对方传了参数，而此方也要传递参数，比如这里的editToDo(id,$event),id是此方想要传给editToDo这个函数的参数，
                    而上级作用链也传了参数过来，分析代码可知，这里上级传了一个newLabel的参数，如果这里没有这个id，那么可以直接
                    调用这个函数editToDo，被调用处直接接收这个newLabel即可，但是这里需要传一个id，如果直接调用editToDo(id),
                    那么上级传过来的newLabel会被id给覆盖，即使被调用处接收两个参数，第二个参数仍然会为undefined，为了解决这个
                    问题，所以这里需要加个$event，用来接收上级传过来的值，再把这个$event传给被调用处的形参-->
                <to-do-item :label="item.label"
                            :done="item.done"
                            :id="item.id"
                            @item-deleted="deleteToDo(item.id)"
                            @item-edited="editToDo(item.id, $event)"
                            @checkbox-changed="updateDoneStatus(item.id)"></to-do-item>
            </li>
        </ul>
<!--        <button @click="testReq">lala</button>-->

<!--        <UserLogin></UserLogin>-->

<!--        <router-link to="/user">this is user</router-link>-->
<!--        <button @click="gotoUser">button-跳转</button>-->
<!--        <div>-->
<!--            <router-view></router-view>-->
<!--        </div>-->
<!--        <router-link to="/">to T1</router-link>-->
<!--        <router-link to="/t2" @click="testReq">to t2</router-link>-->
<!--        <div>-->
<!--            <router-view>-->

<!--            </router-view>-->
<!--        </div>-->

    </div>
</template>

<script>
    // import HelloWorld from './components/HelloWorld.vue'
    import ToDoItem from './components/ToDoItem.vue'
    import uniqueId from 'lodash.uniqueid'
    import ToDoForm from "@/components/ToDoForm";
    import axios from "axios"
    // import UserLogin from "@/components/UserLogin";

    export default {
        name: 'App',
        components: {
              // HelloWorld
            ToDoItem,
            ToDoForm,
            // UserLogin
        },
        // 这里返回的是函数，即data:function(){}，因为data：{}返回的是对象，而在vue中同个组件有可能被多处调用，而对象就会被共享
        // 所以这里需要返回函数
        data() {
            return {
                ToDoItems: [
                    {id: uniqueId('todo-'), label: "l1", done: false},
                    {id: uniqueId('todo-'), label: "l2", done: true},
                    {id: uniqueId('todo-'), label: "l3", done: false},
                    {id: uniqueId('todo-'), label: "l4", done: true},
                ],
                name: "fffffffffffff"
            };
        },
        methods: {
            addToDo(toDoLabel) {
                console.log('to-do-added', toDoLabel);
                // 对这个对象中的ToDoItems对象压入一条数据
                this.ToDoItems.push({id: uniqueId('todo-'), label: toDoLabel, done: false})
            },
            updateDoneStatus(toDoId) {
                // find的返回值是元素这个对象
                const toDoToUpdate = this.ToDoItems.find(item => item.id === toDoId);
                toDoToUpdate.done = !toDoToUpdate.done;
            },
            deleteToDo(toDoId) {
                // findIndex的返回值是元素所在的下标，从0开始
                const itemIndex = this.ToDoItems.findIndex(item => item.id === toDoId);
                // splice是直接修改原数组，这里是从itemIndex这个位置开始，删除一个元素，也有其他用法，比如插入
                this.ToDoItems.splice(itemIndex, 1);
            },
            // 这里newLabel的参数是通过$event传递过来的
            editToDo(toDoId, newLabel) {
                console.log("event =", event, toDoId, newLabel);
                const toDoToEdit = this.ToDoItems.find(item => item.id === toDoId);
                toDoToEdit.label = newLabel;
            },
            testReq() {
                // 使用axios发送post请求给后台
                axios.post('http://localhost:8080/findById/1').then(function (re) {
                    console.log(111111111);
                    console.log(re);

                })
            },
            gotoUser() {
                // 将地址压入路由表
                this.$router.push({
                    path: "/user"
                })
            }
        },
        computed: {
            listSummary() {
                // 对ToDoItems这个对象过滤，item => item.done 表示循环时每个子对象的名称为item，取其中的done这个属性
                const numberFinishedItems = this.ToDoItems.filter(item => item.done).length;
                return '${'+numberFinishedItems+'} out of ${'+this.ToDoItems.length+'} items completed'
            }
        }
    }
</script>

<style>
    /* Global styles */
    .btn {
        padding: 0.8rem 1rem 0.7rem;
        border: 0.2rem solid #4d4d4d;
        cursor: pointer;
        text-transform: capitalize;
    }

    .btn__danger {
        color: #fff;
        background-color: #ca3c3c;
        border-color: #bd2130;
    }

    .btn__filter {
        border-color: lightgrey;
    }

    .btn__danger:focus {
        outline-color: #c82333;
    }

    .btn__primary {
        color: #fff;
        background-color: #000;
    }

    .btn-group {
        display: flex;
        justify-content: space-between;
    }

    .btn-group > * {
        flex: 1 1 auto;
    }

    .btn-group > * + * {
        margin-left: 0.8rem;
    }

    .label-wrapper {
        margin: 0;
        flex: 0 0 100%;
        text-align: center;
    }

    [class*="__lg"] {
        display: inline-block;
        width: 100%;
        font-size: 1.9rem;
    }

    [class*="__lg"]:not(:last-child) {
        margin-bottom: 1rem;
    }

    @media screen and (min-width: 620px) {
        [class*="__lg"] {
            font-size: 2.4rem;
        }
    }

    .visually-hidden {
        position: absolute;
        height: 1px;
        width: 1px;
        overflow: hidden;
        clip: rect(1px 1px 1px 1px);
        clip: rect(1px, 1px, 1px, 1px);
        clip-path: rect(1px, 1px, 1px, 1px);
        white-space: nowrap;
    }

    [class*="stack"] > * {
        margin-top: 0;
        margin-bottom: 0;
    }

    .stack-small > * + * {
        margin-top: 1.25rem;
    }

    .stack-large > * + * {
        margin-top: 2.5rem;
    }

    @media screen and (min-width: 550px) {
        .stack-small > * + * {
            margin-top: 1.4rem;
        }

        .stack-large > * + * {
            margin-top: 2.8rem;
        }
    }

    /* End global styles */
    #app {
        background: #fff;
        margin: 2rem 0 4rem 0;
        padding: 1rem;
        padding-top: 0;
        position: relative;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2.5rem 5rem 0 rgba(0, 0, 0, 0.1);
    }

    @media screen and (min-width: 550px) {
        #app {
            padding: 4rem;
        }
    }

    #app > * {
        max-width: 50rem;
        margin-left: auto;
        margin-right: auto;
    }

    #app > form {
        max-width: 100%;
    }

    #app h1 {
        display: block;
        min-width: 100%;
        width: 100%;
        text-align: center;
        margin: 0;
        margin-bottom: 1rem;
    }
</style>
