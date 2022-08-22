import React, { useEffect } from "react"
import { Alert } from "react-bootstrap"
import { useSelector } from "react-redux"

const Status = () => {
    const message = useSelector(state => state.status)

    useEffect(() => {
        return () => {
            if (message.id) {
                clearInterval(message.id)
            }
        }
    }, [])

    return (
        message?.status === "failure" ?
            <Alert variant="danger" id="notification-fail" > {message.text}</ Alert>
            : message?.status === "success"
            && <Alert variant="success" id="notification-success" > {message.text}</ Alert>
    )
}

export default Status