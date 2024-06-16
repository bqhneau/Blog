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