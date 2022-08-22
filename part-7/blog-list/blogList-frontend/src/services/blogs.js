import axios from "axios"
const baseUrl = "/api/blogs"

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const request = await axios.get(baseUrl)
    return request.data
}

const getById = async (id) => {
    const request = await axios.get(baseUrl + "/" + id)
    return request.data
}

const create = async newBlog => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newBlog, config)
    return response.data
}

const updateLike = async (blog) => {
    const response = await axios.put(`${baseUrl + "/" + blog.id}`, { ...blog, likes: Number(blog.likes) + 1 })
    return response.data
}

const deleteBlog = async (blog) => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.delete(`${baseUrl + "/" + blog.id}`, config)

    return response
}

const commentOnBlog = async ({ comment, id }) => {
    const response = await axios.post(`${baseUrl}/${id}/comments`, { comment })
    return response.data
}

export default { getAll, create, setToken, updateLike, deleteBlog, getById, commentOnBlog }