import { createSlice } from "@reduxjs/toolkit";
const requestSlice = createSlice({
    name:"requests",
    initialState:null,
    reducers:{
        addRequests:(state, action)=>{
            return action.payload;
        },
        removeRequests:(state, action)=>{
           const newArray =  state.filter((request)=>request._id != action.payload) ;
           return newArray;
        },
        clearRequests: () => {
            return null;
        }
    }
})

export const{addRequests, removeRequests, clearRequests} = requestSlice.actions;
export default requestSlice.reducer;
