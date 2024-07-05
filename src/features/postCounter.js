import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    postCount : {
        ProfileDetails : {
            post : 0 
        }
    }
    ,
    followers : 0 ,
    following : 0 ,
    refresh : 0 
} ; 


const postCounter = createSlice({
    name : "postCounter" , 
    initialState  , 
    reducers : {
        incCount : (state , action  )=>{
            state.postCount.ProfileDetails.post = action.payload ; 
        }
        ,
        updateFollowAndFollowers(state , action){
            state.followers = action.payload.followers ; 
            state.following = action.payload.following ; 
        }
        ,
        refreshPage(state ){
            state.refresh++  ; 
        }

    }
})


export const { incCount , updateFollowAndFollowers, refreshPage} = postCounter.actions ; 
export default postCounter.reducer ; 

