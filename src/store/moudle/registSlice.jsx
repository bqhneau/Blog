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