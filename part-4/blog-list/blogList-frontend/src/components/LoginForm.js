import React from "react"
import Status from "./status"
import PropTypes from "prop-types"

const LoginForm = ({
    username,
    password,
    handleUsernameChange,
    handlePasswordChange,
    handleSubmit,
    status
}) => {
    return (
        <div>
            <h2>Log in to application</h2>
            {status !== null && <Status message={status} />}
            <form onSubmit={handleSubmit}>
                <div>
                    username
                    <input
                        id="username"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </div>
                <div>
                    password
                    <input
                        id="password"
                        type={password}
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <button id="login-button" type="submit">login</button>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
}

export default LoginForm