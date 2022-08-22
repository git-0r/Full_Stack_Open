import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Status from "./components/status"
import Togglable from "./components/Togglable"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"


function App() {

    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState(null)
    const [status, setStatus] = useState(null)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)

            blogService.getAll()
                .then(blogs => setBlogs(blogs))
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log("logging in with", username, password)

        try {
            const user = await loginService.login({
                username, password
            })

            window.localStorage.setItem(
                "loggedBlogappUser", JSON.stringify(user)
            )

            blogService.setToken(user.token)
            setUser(user)
            setUsername("")
            setPassword("")

            const blogs = await blogService.getAll()
            console.log("all blogs", blogs)
            setBlogs(blogs)

        } catch (exception) {
            console.log("exception", exception)
            setStatus({ status: "failure", text: "Wrong username or password" })
            setTimeout(() => {
                setStatus(null)
            }, 5000)
        }
    }

    const logout = () => {
        window.localStorage.removeItem("loggedBlogappUser")
        setUser(null)
        setBlogs([])
    }

    const loginForm = () => (
        // <Togglable buttonLabel="log in">
        <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
            status={status}
        />
        // </Togglable>
    )

    const createNewBlog = async (newBlog) => {

        const savedBlog = await blogService.create(newBlog)
        setBlogs([...blogs, savedBlog])

        setStatus({ status: "success", text: `a new blog ${newBlog.title} by ${newBlog.author} added` })
        setTimeout(() => {
            setStatus(null)
        }, 5000)
    }

    const blogForm = () => (
        <div>
            <h1>blogs</h1>
            {status !== null && <Status message={status} />}
            <h2>create new blog</h2>
            {user && <p>{user.name} logged in <button onClick={logout}>logout</button></p>}

            <Togglable buttonLabel="create new blog">
                <BlogForm
                    // status={setStatus}
                    // blogs={blogs}
                    // setBlogs={setBlogs}
                    createNewBlog={createNewBlog}
                />
            </Togglable>
        </div>
    )

    const addLike = async (blog) => {
        const updatedBlog = await blogService.updateLike(blog)
        console.log(updatedBlog)

        setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog))
    }

    blogs.sort((a, b) => b.likes - a.likes)

    return (
        <div>
            {user === null ? loginForm() : blogForm()}
            {blogs.map(blog => <Blog key={blog.id} blog={blog} oldBlogs={blogs} setBlogs={setBlogs} handleLike={addLike} />)}
        </div>
    )
}

export default App
