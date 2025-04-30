    import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import feedReducer from "./feedSlice"
import connectionReducer from "./connectionslice"
import requestReducer from "./requestSlice"
import searchReducer from "./searchSlice"

const appStore = configureStore({
    reducer:{
        user: userReducer,
        feed: feedReducer,
        connections: connectionReducer,
        requests:requestReducer,
        searchUsers:searchReducer
    },

});

export default appStore