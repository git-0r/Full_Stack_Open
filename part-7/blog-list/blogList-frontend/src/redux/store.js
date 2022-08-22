import { configureStore } from "@reduxjs/toolkit"
import blogsReducer from "./reducers/blogsSlice"
import userReducer from "./reducers/userSlice"
import statusReducer from "./reducers/statusSlice"

export default configureStore({
    reducer: {
        blogs: blogsReducer,
        user: userReducer,
        status: statusReducer
    }
})