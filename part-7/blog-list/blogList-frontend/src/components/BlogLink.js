import React from "react"
import { ListGroup } from "react-bootstrap"
import { Link } from "react-router-dom"

const BlogLink = ({ blog }) => {

    return (
        <ListGroup.Item className="blog mt-3">
            <Link to={blog.id + "/"} className="title">{blog.title} <i>{blog.author}</i></Link>
        </ListGroup.Item>)
}

export default BlogLink