import React, { useState } from "react"
import blogService from "../services/blogs"

const Blog = ({ blog, oldBlogs, setBlogs, handleLike }) => {
    const [visible, setVisibile] = useState(false)

    const blogStyles = {
        border: "1px solid black",
        padding: "5px",
        margin: "5px 0",
    }
    // console.log(updateLike)

    const removeBlog = async (blog) => {
        window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)
        await blogService.deleteBlog(blog)
        setBlogs(oldBlogs.filter(b => b.id !== blog.id))

    }

    return (
        <div className="blog" style={blogStyles}>
            <p className="title">{blog.title} <i>{blog.author}</i> <button className="toggleContent" onClick={() => setVisibile(!visible)}>{visible ? "hide" : "view"}</button></p>
            {visible && <div className="togglableContent">
                <p className="url">{blog.url}</p>
                <p className="likes">{blog.likes} <button className="likeButton" onClick={() => handleLike(blog)}>like</button ></p>
                <button className="remove-blog" onClick={() => removeBlog(blog)}>Remove</button>
            </div>}
        </div>)
}

export default Blog