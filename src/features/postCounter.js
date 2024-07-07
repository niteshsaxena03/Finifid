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
    refresh : 0 ,  // for Side Button's
    contentRefresh : 0 ,// For page refresh 
    Story : [] ,
    friendStory : []
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
        ,
        refreshContent(state){
            state.contentRefresh++ ; 
        }
        ,
        fetchStory(state , action ){
          state.Story = action.payload ;  
        }
        ,
        fetchFriendStory(state , action ){
            state.friendStory    = action.payload ;  
          }


    }
})


export const { incCount , updateFollowAndFollowers, refreshPage , refreshContent , fetchStory , fetchFriendStory } = postCounter.actions ; 
export default postCounter.reducer ; 

