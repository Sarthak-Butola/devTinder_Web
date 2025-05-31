import { createSlice } from "@reduxjs/toolkit";


const savedMode = localStorage.getItem("mode");
let initialState = savedMode === "false" ? false : true;

const modeSlice = createSlice({
    name:"mode",
    initialState,
    reducers:{
        changeMode:(state,action)=>{
            // ✅ Saving to localStorage
            const newMode = !state;
            localStorage.setItem("mode", newMode);
            return newMode;
        },
    }
})

export const{changeMode} = modeSlice.actions;
export default modeSlice.reducer;