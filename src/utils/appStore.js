    import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import feedReducer from "./feedSlice"
import connectionReducer from "./connectionslice"
import requestReducer from "./requestSlice"
import searchReducer from "./searchSlice"
import modeReducer from "./modeSlice"
const appStore = configureStore({
    reducer:{
        user: userReducer,
        feed: feedReducer,
        connections: connectionReducer,
        requests:requestReducer,
        searchUsers:searchReducer,
        mode:modeReducer,
    },

});

export default appStore