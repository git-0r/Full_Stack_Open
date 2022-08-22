import { useLocation } from "react-router-dom"
import React, { useEffect, useState } from "react"
import blogService from "../services/blogs"
import { useDispatch } from "react-redux"
import { deleteBlog, likeBlog } from "../redux/reducers/blogsSlice"
import { showStatus } from "../redux/reducers/statusSlice"
import { Button } from "react-bootstrap"

const Blog = () => {
    const dispatch = useDispatch()
    const { pathname } = useLocation()
    const id = pathname.split("/")[2]
    const [blog, setBlog] = useState({})

    const addLike = async (blog) => {
        dispatch(likeBlog(blog))
        setBlog(prev => ({ ...prev, likes: prev.likes + 1 }))
        dispatch(showStatus({ status: "success", text: `you liked ${blog.title} by ${blog.author}` }))
    }

    const removeBlog = async (blog) => {
        if (
            window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)
        ) {
            dispatch(deleteBlog(blog))
        }
    }

    const addComment = (e) => {
        e.preventDefault()
        const comment = e.target.comment.value
        console.log(comment)
        blogService.commentOnBlog({ comment, id: blog.id }).then(data => setBlog(prev => ({ ...prev, comments: [...prev.comments, data.comment] })))
        e.target.comment.value = ""
    }
    useEffect(() => {
        blogService.getById(id).then(data => setBlog(data[0]))
    }, [id])
    return <>
        <h1>{blog?.title} {blog?.author}</h1>
        <a href={blog?.url}>{blog?.url}</a>
        <p>{blog?.likes} likes <button className="likeButton" onClick={() => addLike(blog)}>like</button ></p>
        <p>added by {blog?.author}</p>
        <Button variant="primary" onClick={() => removeBlog(blog)}>remove blog</Button>
        <form onSubmit={addComment}>
            <input type="text" required name="comment" />
            <button>add comment</button>
        </form>
        <p>comments</p>
        <ul>
            {
                blog?.comments?.map((comment, i) => <li key={i}>{comment}</li>)
            }
        </ul>
    </>
}

export default Blog