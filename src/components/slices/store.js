import { configureStore } from '@reduxjs/toolkit'; 
import authReducer from './authSlice';
import rosterReducer from './rosterSlice';


const store =  configureStore({
    reducer: {
        auth: authReducer,
        roster: rosterReducer
    }
});

export default store;