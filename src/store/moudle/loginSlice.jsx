import { createSlice } from '@reduxjs/toolkit';
import { saveData, getData } from '../../utils/localStorage';

// 获取 currentUser --- 解决刷新数据消失 bug
const initUser = () => {
    const currentUser = getData('currentUser')
    if (currentUser) {
        return currentUser
    } 
    return null
}

// 导出数据
export const loginSlice = createSlice({
    name: "login",
    
    initialState: {
        email: '',
        password: '',
        errors: null,
        currentUser: initUser(),
        token:null
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
        },
        // 存储用户信息
        saveUserInfo: (state, action) => {
            // 1、将用户信息存储到 localStorage
            const  data  = action.payload
            let currentUser = data
            let token = data.token
            saveData('currentUser', currentUser)
            saveData('token', token)
            // 2、将用户信息存储到 redux
            state.currentUser = data   // 【bug】在Redux中，存储的状态数据不是持久的，它仅在当前页面生命周期内有效
            state.token = data.token
        }
    }
})

// 导出方法
export const { loginFileUpdate, loginSubmit, deleteOne,saveUserInfo } = loginSlice.actions

// 导出 reducer
export default loginSlice.reducer