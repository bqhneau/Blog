import { configureStore } from '@reduxjs/toolkit';
import registSlice from './moudle/registSlice';
import loginSlice from './moudle/loginSlice';

export default configureStore({
    reducer: {
        regist: registSlice,
        login: loginSlice
    }
})