import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name:'searchUsers',
    initialState:null,
    reducers:{
        addUsers:(state,action)=>{
            return action.payload;
        },
        removeUsers:(state,action)=>{
            return null;
        }
    }
})
export const {addUsers, removeUsers} = searchSlice.actions;
export default searchSlice.reducer;