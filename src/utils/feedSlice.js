import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name:"feed",
    initialState: null,
    reducers:{
        addFeed:(state,action)=>{
            return action.payload;
        },
        removeFeed:(state, action)=>{
            const newFeed = state.filter((user)=>action.payload !== user._id);
            return newFeed;
        }
    }

})

export const{addFeed, removeFeed} = feedSlice.actions;
export default feedSlice.reducer;