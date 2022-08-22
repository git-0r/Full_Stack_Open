import React, { useState } from "react"
import { Stack, Form, Button } from "react-bootstrap"

const BlogForm = ({ createNewBlog }) => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")

    const createBlog = (e) => {
        e.preventDefault()
        const newBlog = { title, author, url }
        console.log(newBlog)

        createNewBlog(newBlog)
        setTitle("")
        setAuthor("")
        setUrl("")
    }


    return (
        <Form onSubmit={createBlog}>
            <Stack gap={3}>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type={"text"} onChange={({ target }) => setTitle(target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="author">
                    <Form.Label>Author</Form.Label>
                    <Form.Control type={"text"} onChange={({ target }) => setAuthor(target.value)} />
                </Form.Group><Form.Group className="mb-3" controlId="url">
                    <Form.Label>Url</Form.Label>
                    <Form.Control type={"text"} onChange={({ target }) => setUrl(target.value)} />
                </Form.Group>
            </Stack>
            <Button variant="primary" id="create-blog-button" type="submit" className="mb-1">Create</Button>
        </Form >
    )
}

export default BlogForm