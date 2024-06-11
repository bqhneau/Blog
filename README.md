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