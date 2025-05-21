import { createSlice } from "@reduxjs/toolkit";
const modeSlice = createSlice({
    name:"mode",
    initialState: true,
    reducers:{
        changeMode:(state,action)=>{
            return !state;
        },
    }
})

export const{changeMode} = modeSlice.actions;
export default modeSlice.reducer;