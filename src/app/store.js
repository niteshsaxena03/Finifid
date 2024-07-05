import { configureStore} from "@reduxjs/toolkit";
import postCounter from "../features/postCounter.js";

export const Store = configureStore({
    reducer : {
        postCounter : postCounter 
    },
})