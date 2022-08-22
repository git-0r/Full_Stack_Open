import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import blogService from "../services/blogs"

export const Blogs = () => {
    const user = useSelector(state => state.user)
    const { pathname } = useLocation()
    const userId = pathname.split("/")[2]
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        blogService.getAll().then(data => setBlogs(data.filter(blog => blog.user.id === userId)))
    }, [userId])
    return <>
        <h1>blogs</h1>
        <h1>{user?.username}</h1>
        <h2>added blogs</h2>
        <ul>
            {
                blogs.map(blog => <li key={blog?.id}>{blog?.title}</li>)
            }
        </ul>
    </>
}