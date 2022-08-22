import React from "react"
import Status from "./status"
import PropTypes from "prop-types"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const LoginForm = ({
    username,
    password,
    handleUsernameChange,
    handlePasswordChange,
    handleSubmit,
    status
}) => {
    return (
        <>
            {status !== null && <Status message={status} />}
            <Container>
                <Row>
                    <Col />
                    <Col>
                        <h2 className="mt-5 mb-5">Log in to application</h2>
                        <Form onSubmit={handleSubmit} className="mb-2">
                            <Form.Group className="mb-3" controlId="formBasicUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="username" placeholder="Enter username" value={username} onChange={handleUsernameChange} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                    <Col />
                </Row>
            </Container>
        </>
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