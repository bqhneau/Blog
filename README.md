## 1、搭建项目
```
    pnpm create vite
    ...
    cd frontend
    pnpm install
    pnpm run dev
```

## 2、配置路由

### 2.1 下载包
```
    pnpm i react-router-dom@6
```
### 2.2 引入路由模式并使用
```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// 1、引入 history 路由模式
import {BrowserRouter} from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2、嵌套并使用 */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
```
### 2.3 配置路由
```
    1、创建公共组件 Header, 路由组件 Home、Login 
    2、配置路由表并暴露
    3、useRoutes 使用路由表
```
```js 
// route/index.jsx
import Home from "../pages/Home"
import Login from "../pages/Login"

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
```
```js
// App.jsx
import Header from './components/Header'
import {useRoutes} from 'react-router-dom';
import routes from './routes';

function App() {
  // 1、通过 useRoutes 使用路由表
  const element = useRoutes(routes)

  return (
    <>
      {/* 引入公共组件 header */}
      <Header />
      {/* 2、将 element 放到页面上 */}
      <div>
        {element}
      </div>
    </>
  )
}

export default App
```

## 3、性能优化

### 3.1 路由懒加载( 对打包友好 )
```
    1、lazy Suspence 实际上是 react 的函数/组件 用的时候将内容包一下
    2、react 其他函数 使用规则亦是如此
    3、主要目的是用的组件才导入，对大型项目【打包】友好
```
```js
// 1、路由表中引入方式变为 lazy
const Home = lazy(() => import('../pages/Home'))
const Login = lazy(()=>import('../pages/Login'))

// 2、使用路由组件的页面 展示时 引入 Suspence（组件）搭配使用
import {Suspense} from 'react'
```
### 3.2 组件相关的性能优化
```
【问题】
    1、无论是函数组件，还是类组件，都存在一个致命的问题 ==> 状态改变，无论前后值是否相同，组件都会重新渲染
    2、如果组件之间存在嵌套关系，父组件更新，子组件也会重新渲染
【解决】
    1、对于类组件
        使用 PureComponent 阻止组件不必要的更新(props state 不改变)
    2、对于函数组件
        使用 memo 阻止组件不必要的更新(props 不改变)
        并搭配 useMemo useCallback，对【对象/数组/函数】进行缓存,
【使用】
    1、类组件
        直接 extends PureComponent 创建类组件
    2、函数组件
        经典包裹 memo(<App />)
```
