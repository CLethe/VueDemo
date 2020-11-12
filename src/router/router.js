
import Vue from "vue";
import VueRouter from 'vue-router';
Vue.use(VueRouter)
// import UserLogin from "@/components/UserLogin";
import T1 from "@/components/T1";
import T2 from "@/components/T2";

// 配置路由表，path对应的是路径，component是该路径对应的组件
const routes=[
    // {
    //     path: "/",
    //     component: UserLogin,
    //     children: [
    //         {
    //             path: "/user",
    //             component: UserLogin
    //         }
    //     ]
    // }
    {path: "/", component: T1},
    {
        path: "/t2",
        component: T2
    }
]
// 将路由表配置进路由信息
const router= new VueRouter({
    mode: "history",
    routes: routes
})
export default router
