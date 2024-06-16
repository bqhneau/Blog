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

## 4、静态资源
```
【两种方式】
    1、前端自己准备 自己搞
    2、后端在服务器准备好了，前端通过link标签，拿到资源
```
### 4.1 bootstrap（后端）
```html
  1、后端准备好
  2、前端 在 link 写对应地址
  <link rel="stylesheet" href="http://localhost:8000/main.css">
```
### 4.2 阿里图标库（本地）
```html
  1、前端将文件放在public文件夹下
  2、link 写对应地址
  <link rel="stylesheet" href="./public/icon/iconfont.css">
```
### 4.3 测试代码
```js
<nav className="navbar navbar-light">
    <div className="container">
        {/* 测试样式 */}
        <Link to={"/"} className="navbar-brand"> 个人博客</Link>

        {/* 测试图标 */}
        <div className="iconfont icon-gift"></div>
    </div>
</nav>
```

## 5、头部组件
```
    1、右侧位置判断是否有用户信息传入
        (1) 有则显示 主页 写作 设置 头像
        (2) 无则显示 主页 登录 注册
    2、创建对于的路由组件 并重写路由表
```

## 6、注册/登录组件UI
```
    1、利用 bootstrap 搭建 form 表单
    2、类名 去官网 V4 找
```

## 7、封装错误组件
```js
const Errors = ({errors}) => {
    if (!errors) {
        return null;
    }

    return (
        <ul className="errors-message">
            <li>{ errors }</li>
        </ul>
    )
}

export default Errors
```

## 8、使用 redux

### 8.1 下载依赖
```
    pnpm i react-redux @reduxjs/toolkit
```

### 8.2 配置 redux
1. 创建大仓库
```js
// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import registSlice from './moudle/registSlice';

export default configureStore({
    reducer: {
        regist: registSlice
    }
})
```
2. 创建小仓库
```js
// store/modules/registSlice.jsx
import { createSlice } from '@reduxjs/toolkit';

// 导出数据
export const registSlice = createSlice({
    name: "regist",
    
    initialState: {
        email: '',
        username: '',
        password: '',
        errors:null
    },

    reducers: {
        // 绑定表单数据
        registFileUpdate: (state,action) => {
            console.log(action);
            // 根据 key 动态更改 email username password
            let key = action.payload.key;
            let value = action.payload.value;
            state[key] = value
        }
    }
})

// 导出方法
export const { registFileUpdate } = registSlice.actions

// 导出 reducer
export default registSlice.reducer
```
3. 主程序入口集成仓库
```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';

// 1、引入 Provider 注入 store 数据
import { Provider } from 'react-redux';
import store from './store/index.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  // 2、嵌套并使用
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
```

### 8.3 注册页面使用仓库实现受控组件
```js
import { useSelector,useDispatch } from 'react-redux';
import {registFileUpdate} from '../../store/moudle/registSlice'

// 读取切片
let { email, username, password, errors } = useSelector((state) => {
  // state 为 仓库中 所有的 reducer
  return state.regist
})

// 分发 action
const dispatch = useDispatch()

// 使用 value onChange 实现 受控组件 
<fieldset className='form-group'>
    <input type="text"
        value={email}
        onChange={(e) => dispatch(registFileUpdate({
            key: 'email',
            value:e.target.value
        }))}
        placeholder='用户邮箱'
        className='form-control'
    />
</fieldset>
```

