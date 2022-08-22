import { createSlice } from "@reduxjs/toolkit"
import blogService from "../../services/blogs"

const blogsSlice = createSlice({
    name: "blogsList",
    initialState: [],
    reducers: {
        setBlogs: (state, action) => [...state, ...action.payload].sort((a, b) => b.likes - a.likes),
        removeAllBlogs: () => [],
        addNewBlog: (state, action) => [...state, action.payload],
        removeBlog: (state, action) => state.filter((blog) => blog.id !== action.payload),
        updateLikedBlog: (state, action) => state.map(blog => blog.id !== action.payload.id ? blog : action.payload).sort((a, b) => b.likes - a.likes)
    }
})

export const { setBlogs, removeAllBlogs, addNewBlog, removeBlog, updateLikedBlog } = blogsSlice.actions
export default blogsSlice.reducer

export const fetchAllBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = (data) => {
    return async (dispatch) => {
        const savedBlog = await blogService.create(data)
        dispatch(addNewBlog(savedBlog))
    }
}

export const deleteBlog = (blog) => {
    return async (dispatch) => {
        await blogService.deleteBlog(blog)
        dispatch(removeBlog(blog.id))
    }
}

export const likeBlog = (blog) => {
    return async (dispatch) => {
        const updatedBlog = await blogService.updateLike(blog)
        dispatch(updateLikedBlog(updatedBlog))
    }
}