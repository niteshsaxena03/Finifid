import { configureStore} from "@reduxjs/toolkit";
import postCounter from "../features/postCounter.js";
import {thunk} from 'redux-thunk';

export const Store = configureStore({
    reducer : {
        postCounter : postCounter 
    },
    middleware : (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
    }).concat(thunk),
})