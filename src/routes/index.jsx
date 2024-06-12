import {lazy} from 'react';

// import Home from "../pages/Home"
// import Login from "../pages/Login"

// lazy 实际上是一个函数 用的时候将组件包一下（使用规则同 react 其他函数）
const Home = lazy(() => import('../pages/Home'))
const Login = lazy(() => import('../pages/Login'))
const Regist = lazy(() => import('../pages/Regist'))
const Setting = lazy(() => import('../pages/Setting'))
const Profile = lazy(() => import('../pages/Profile'))
const ArticleNew = lazy(() => import('../pages/ArticleNew'))

export default [
    {
        path: '/',
        element:<Home />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/setting',
        element: <Setting />
    },
    {
        path: '/regist',
        element: <Regist />
    },
    {
        path: '/profile',
        element: <Profile />
    },
    {
        path: '/article/new',
        element: <ArticleNew />
    },
]