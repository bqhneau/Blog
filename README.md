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

## 9、封装 fetch
```
    1、封装 请求基本路径
    2、封装 请求头
    3、基于 baseUrl headers 封装了四种请求
    4、将封装好的四种请求暴漏出去 方便使用

```
```js

// 1、封装 请求基本路径
const baseUrl = 'http://localhost:8000/api/v1'

// 请求方法
const method = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE:'DELETE'
}

// 数据格式
const contentType = {
    JSON: "application/json;charset=UTF-8",
    FORM:"application/x-www-form-urlencoded;charset=UTF-8"
}

// 2、封装 请求头
const getHeaders = () => {
    const token = ''

    const headers = {
        // 告诉服务器，客户端正在发送的数据是什么格式
        'Content-type': contentType.JSON,
        // 向服务器提供认证信息
        'Authorization':`Token${token}`
    }

    return headers
}

// 3、封装了四种请求
// get
const getRequest = async (url) => {
    let response = await fetch(baseUrl + url, {
        method: method.GET,
        headers:getHeaders()
    })

    return response.json()
}

// post
const postRequest = async (url, body) => {
    let response = await fetch(baseUrl + url, {
        method: method.POST,
        headers: getHeaders(),
        body:JSON.stringify(body)
    })

    return response.json()
}

// put
const putRequest = async (url, body) => {
    let response = await fetch(baseUrl + url, {
        method: method.PUT,
        headers: getHeaders(),
        body:JSON.stringify(body)
    })

    return response.json()
}

// delete
const deleteRequest = async (url) => {
    let response = await fetch(baseUrl + url, {
        method: method.DELETE,
        headers:getHeaders()
    })
}

// 暴漏出去 方便使用
export default {
    get: getRequest,
    post: postRequest,
    put: putRequest,
    delete:deleteRequest
}
```

## 10、注册流程的实现
```
    1、完善注册请求  -- 二次封装的 fetch
    2、切片中填写注册方法，用来捕获错误信息 -- 仓库
    3、注册组件 写 提交方法
        该方法中发送请求 并调用仓库中的方法 返回错误信息
        (1) 判断表单检验是否通过
            通过 调用 切片中注册方法 向后端发送请求
            不通过 提示用户校验不通过
        (2) 向后端发送请求后，判断后端响应 
            1 成功 跳转登录页
            0 失败 显示报错信息
```

### 10.1 完善注册请求
```
    模块化的思想 将用户相关的请求 放在一个文件 request/modules/user
```
```js
// 负责管理 用户相关的请求
import apis from '../apis'

// 这里的 { user } 是对象的简写方式 {user：user} 传递的实际上是一个user对象
const regist = (user) => apis.post('/users', { user })

export default {
    regist
}
```
### 10.2 切片中填写注册方法，用来捕获错误信息
```
    有点多余，但是为了练习使用 redux 
```
```js
import { createSlice } from '@reduxjs/toolkit';

// 导出数据
export const registSlice = createSlice({
    ...
    reducers: {
        // 用来捕获错误信息
        registSubmit: (state,action) => {
            state.errors = action.payload
        }
    }
    ...
})

// 导出方法
export const { registFileUpdate, registSubmit } = registSlice.actions
```

### 10.3 注册组件 写 提交方法
```js
const registOnsubmit = (e) => {
     e.preventDefault()
     user.regist({ email, username, password })
         .then(res => {
             if (res.status == 1) {
                 console.log('注册成功', res);
                 nav('/login')
             } else {
                 console.log('注册失败', res.message);
                 dispatch(registSubmit(res.message))
             }
             
         })
         .catch(err => {
             console.log('服务器错误', err);
             dispatch(registSubmit(err.message))
         })
 }
```
### 10.4 【bug】注册完点回注册，信息还在
```
【分析】
    数据持久化 注册后没有重置数据
【解决】
    借助 useEffect 在每次进入组件时，清空数据
        1、仓库中 定义 删除方法 并暴露
        2、注册组件调用
```
```js
    // 解决bug
    useEffect(() => {
        return () => {
            // 清空数据
            dispatch(deleteOne())
        }
    },[])
```

## 11、登陆流程

### 11.1 补全请求接口
```js
import apis from '../apis'

// 这里的 { user } 是对象的简写方式 {user：user} 传递的实际上是一个user对象
const regist = (user) => apis.post('/users', { user })

const login = (email, password) => apis.post('/users/login', { user: { email, password } })

const getUserInfo = (username) => apis.get(`/users/${username}`)

const updateUser = (user) => apis.put('/users',{user})

export default {
    regist,
    login,
    getUserInfo,
    updateUser
}
```
### 11.2 创建登录仓库
```js
import { createSlice } from '@reduxjs/toolkit';

// 导出数据
export const loginSlice = createSlice({
    name: "login",
    
    initialState: {
        email: '',
        password: '',
        errors:null
    },

    reducers: {
        // 绑定表单数据
        loginFileUpdate: (state,action) => {
            // 根据 key 动态更改 email username password
            let key = action.payload.key;
            let value = action.payload.value;
            state[key] = value
        },
        // 用来捕获错误信息
        loginSubmit: (state,action) => {
            state.errors = action.payload
        },
        // 清除数据
        deleteOne: (state) => {
            state.email = '',
            state.password = '',
            state.errors = ''
        }
    }
})

// 导出方法
export const { loginFileUpdate, loginSubmit, deleteOne } = loginSlice.actions

// 导出 reducer
export default loginSlice.reducer
```
### 11.3 更改注册逐渐
```
    逻辑与注册一致，不在赘述了，直接看代码
```
```js
import { memo, useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import Errors from '../../components/Errors';

import {useSelector,useDispatch} from 'react-redux';
import { loginFileUpdate, loginSubmit, deleteOne } from '../../store/moudle/loginSlice'
import users from '../../request/modules/user';


const Regist = memo(() => {

    // 获取切片
    let { email,password,errors } = useSelector((state) => {
        return state.login
    })

    // 分发 action
    const dispatch = useDispatch()

    // 跳转
    const nav = useNavigate()

    // 登录提交
    const loginOnSubmit = (e) => {
        e.preventDefault()
        users.login( email, password )
            .then(res => {
                if (res.status === 1) {
                    console.log('登陆成功', res.message);
                    nav('/home')
                } else {
                    console.log('登陆失败', res.message);
                    dispatch(loginSubmit(res.message))
                }
            })
            .catch(err => {
                console.log('登陆失败', err.message);
                dispatch(loginSubmit(res.message))
            })
    }

    // 重置表单
    useEffect(() => {
        return () => {
            dispatch(deleteOne())
        }
    },[])

    return (
        <div className="container page">
            <div className="row">
                <div className="col-md-6 offset-md-3 col-xs-12">
                    <h3 className='text-xs-center'>登录</h3>
                    <p className='text-xs-center'>
                        <Link to={"/regist"}>
                            没有账号去注册?
                        </Link>
                    </p>
                    <Errors errors={errors} />
                    <form onSubmit={loginOnSubmit}>
                        {/* 对表单进行分组 */}
                        <fieldset className='form-group'>
                            <input type="text"
                                placeholder='用户邮箱'
                                className='form-control'
                                value={email}
                                onChange={(e) => dispatch(loginFileUpdate({
                                    key: 'email',
                                    value: e.target.value
                                }))}
                            />
                        </fieldset>
                        <fieldset className='form-group'>
                            <input type="password"
                                placeholder='用户密码'
                                className='form-control'
                                value={password}
                                onChange={(e) => dispatch(loginFileUpdate({
                                    key: 'password',
                                    value: e.target.value
                                }))}
                            />
                        </fieldset>
                        {/* type='submit' 可以触发表单提交 onSubmit */}
                        <p className='text-xs-center'>
                            <button type='submit' className='btn btn-success'>
                                登录
                            </button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
})
export default Regist
```

## 12 用户信息本地存储

### 12.1 配置localStorage
```js
// 持久化存储

// 1、存储
export const saveData = (key, value) => {
    localStorage.setItem(key,JSON.stringify(value))
}

// 2、获取
export const getData = (key) => {
    return JSON.parse(key)  // 返回获取到的value
}

// 3、删除
export const deleteData = (key) => {
    return localStorage.removeItem(key)  // 返回是否删除成功
}
```

### 12.2 配置 loginSlice
```js
// 存储用户信息
saveUserInfo: (state, action) => {
   // 1、将用户信息存储到 localStorage
   const  data  = action.payload
   let currentUser = data
   let token = data.token
   saveData('currentUser', currentUser)
   saveData('token', token)
   // 2、将用户信息存储到 redux
   return {...state,...data}
}
```

### 12.3 将用户信息存储到 localStorage 以及 redux
```js
const loginOnSubmit = (e) => {
  e.preventDefault()
  users.login( email, password )
      .then(res => {
          if (res.status === 1) {
              console.log('登陆成功', res.message);
              // 将用户信息存储到本地和仓库
              console.log(res.data);
              dispatch(saveUserInfo(res.data))
              nav('/')
          } else {
              console.log('登陆失败', res.message);
              dispatch(loginSubmit(res.message))
          }
      })
      .catch(err => {
          console.log('登陆失败', err.message);
          dispatch(loginSubmit(err.message))
      })
}
```

