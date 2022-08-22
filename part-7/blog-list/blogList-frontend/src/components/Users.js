import { useSelector } from "react-redux"
import React, { useEffect, useState } from "react"
import userService from "../services/users"
import { Link } from "react-router-dom"

export const Users = () => {
    const user = useSelector((state) => state.user)
    const [users, setUsers] = useState([])

    useEffect(() => {
        if (user?.username) {
            userService.getAll().then(data => setUsers(data))
        }
    }, [user])

    return (
        <div>
            <h1>Users</h1>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th colSpan="2">blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users?.map(user => (<tr key={user.username}>
                            <td>
                                <Link to={"/users/" + user.id}>{user.username}</Link>
                            </td>
                            <td>{user?.blogs.length}</td>
                        </tr>))
                    }
                </tbody>
            </table>
        </div>
    )
}
