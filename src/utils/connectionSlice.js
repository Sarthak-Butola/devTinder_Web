import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name:'connections',
    initialState:null,
    reducers:{
        addConnections:(state,action)=>{
            return action.payload;
        },
        removeConnections:(state,action)=>{
            if (!state) return state; 
            // return null;
            const newArray =  state.filter((connection)=>connection._id != action.payload) ;
            return newArray;
        },
        clearConnections:(state,action)=>{
            return null;
        }
    }
})


export const {addConnections, removeConnections, clearConnections} = connectionSlice.actions;
export default connectionSlice.reducer;
