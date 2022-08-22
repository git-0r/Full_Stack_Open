import React, { useState, useEffect } from "react"
import BlogLink from "./components/BlogLink"
import blogService from "./services/blogs"
import Status from "./components/status"
import Togglable from "./components/Togglable"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import { fetchAllBlogs, createBlog } from "./redux/reducers/blogsSlice"
import { useDispatch, useSelector } from "react-redux"
import { setUser, userLogin, userLogout } from "./redux/reducers/userSlice"
import { showStatus } from "./redux/reducers/statusSlice"
import { Routes, Route, Outlet } from "react-router-dom"
import { Blogs } from "./components/Blogs"
import Blog from "./components/Blog"
import { Users } from "./components/Users"
import "bootstrap/dist/css/bootstrap.min.css"
import { Navbar, Nav, Container, Button, Row, Col, ListGroup } from "react-bootstrap"

function App() {

    const blogs = useSelector(state => state.blogs)
    const status = useSelector(state => state.status)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(setUser(user))
            blogService.setToken(user.token)
            dispatch(fetchAllBlogs())
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log("logging in with", username, password)

        try {
            setUsername("")
            setPassword("")
            dispatch(userLogin({ username, password }))

        } catch (exception) {
            console.log("exception", exception)
            dispatch(showStatus({ status: "failure", text: "Wrong username or password" }))
        }
    }

    const logout = () => {
        dispatch(userLogout())
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
        dispatch(createBlog(newBlog))
        dispatch(showStatus({ status: "success", text: `a new blog ${newBlog.title} by ${newBlog.author} added` }))
    }

    const blogForm = () => (
        <div>
            <h1>blog app</h1>
            <Togglable buttonLabel="Create New Blog">
                <BlogForm
                    createNewBlog={createNewBlog}
                />
            </Togglable>
        </div>
    )

    return (<Container>
        {status !== null && <Status />}
        {user?.username &&
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Nav className="me-auto">
                        <Nav.Link href="/blogs">Blogs</Nav.Link>
                        <Nav.Link href="/users">Users</Nav.Link>
                        <p className="ml-auto">
                            {/* {user?.username} logged in {" "} */}
                            <Button onClick={logout} varient="primary"> logout</Button>
                        </p>
                    </Nav>
                </Container>
            </Navbar>
        }
        <Routes>
            <Route element={user?.username ? <Outlet /> : loginForm()} >
                <Route path="/blogs" element={
                    <Container>
                        <Row>
                            <Col>
                                {user === null ? loginForm() : blogForm()}
                                <ListGroup>
                                    {blogs.map(blog => <BlogLink key={blog.id} blog={blog} />)}
                                </ListGroup>
                            </Col>
                        </Row>
                    </Container>
                } />
                <Route path="/users" element={<Users logout={logout} />} />
                <Route path="/users/:id" element={<Blogs logout={logout} />} />
                <Route path="/blogs/:id" element={<Blog logout={logout} />} />
            </Route>
        </Routes>
    </Container>
    )
}

export default App
