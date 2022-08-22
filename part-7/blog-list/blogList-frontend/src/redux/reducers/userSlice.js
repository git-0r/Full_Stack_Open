const { createSlice } = require("@reduxjs/toolkit")
import loginService from "../../services/login"
import blogService from "../../services/blogs"
import { fetchAllBlogs, removeAllBlogs } from "./blogsSlice"


const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        setUser: (state, action) => {
            return action.payload
        },
        logout: () => null
    }
})

export const { setUser, logout } = userSlice.actions

export default userSlice.reducer

export const userLogin = (credentials) => {
    return async (dispatch) => {
        const { token, ...user } = await loginService.login(credentials)
        window.localStorage.setItem(
            "loggedBlogappUser", JSON.stringify(user)
        )
        blogService.setToken(token)
        dispatch(setUser(user))
        dispatch(fetchAllBlogs())
    }
}

export const userLogout = () => {
    return async (dispatch) => {
        window.localStorage.removeItem("loggedBlogappUser")
        dispatch(removeAllBlogs())
        dispatch(logout())
    }
}