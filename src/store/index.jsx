import { configureStore } from '@reduxjs/toolkit';
import registSlice from './moudle/registSlice';

export default configureStore({
    reducer: {
        regist: registSlice
    }
})