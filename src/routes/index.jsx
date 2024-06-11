import {lazy} from 'react';

// import Home from "../pages/Home"
// import Login from "../pages/Login"

// lazy 实际上是一个函数 用的时候将组件包一下（使用规则同 react 其他函数）
const Home = lazy(() => import('../pages/Home'))
const Login = lazy(()=>import('../pages/Login'))

export default [
    {
        path: '/',
        element:<Home />
    },
    {
        path: '/login',
        element: <Login />
    },
]