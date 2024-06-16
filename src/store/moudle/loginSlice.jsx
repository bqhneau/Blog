import { createSlice } from '@reduxjs/toolkit';
import {saveData} from '../../utils/localStorage';

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
            return {...state,...data}
        }
    }
})

// 导出方法
export const { loginFileUpdate, loginSubmit, deleteOne,saveUserInfo } = loginSlice.actions

// 导出 reducer
export default loginSlice.reducer