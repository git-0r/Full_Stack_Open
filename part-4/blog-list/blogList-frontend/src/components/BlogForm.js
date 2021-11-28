import React, { useState } from "react"
// import blogService from "../services/blogs"

const BlogForm = ({ createNewBlog }) => {

    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")

    const createBlog = (e) => {
        e.preventDefault()
        const newBlog = { title, author, url }
        console.log(newBlog)

        createNewBlog(newBlog)
    }


    return (
        <form onSubmit={createBlog}>
            <div>
                <label htmlFor="title">title: </label>
                <input onChange={({ target }) => setTitle(target.value)} id="title" name="title" type="text"></input>
            </div>
            <div>
                <label htmlFor="author">author: </label>
                <input onChange={({ target }) => setAuthor(target.value)} id="author" name="author" type="text"></input>
            </div>
            <div>
                <label htmlFor="url">url: </label>
                <input onChange={({ target }) => setUrl(target.value)} id="url" name="url" type="url"></input>
            </div >
            <button id="create-blog-button" type="submit">create</button>
        </form >
    )
}

export default BlogForm