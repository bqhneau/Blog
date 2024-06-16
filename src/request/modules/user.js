// 负责管理 用户相关的请求

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