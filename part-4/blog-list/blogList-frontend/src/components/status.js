import React from "react"

const Status = ({ message }) => (
    message.status === "failure" ?
        <div id="notification-fail" style={{
            border: "1px solid red",
            backgroundColor: "gray",
            color: "rgb(255, 0, 0)",
            padding: "5px",
            borderRadius: "5px",
            margin: "5px 0px"
        }}> {message.text}</div >
        : message.status === "success"
        && <div id="notification-success" style={{
            border: "1px solid green",
            backgroundColor: "gray",
            color: "green",
            padding: "5px",
            borderRadius: "5px",
            margin: "5px 0px"
        }}> {message.text}</div >
)

export default Status