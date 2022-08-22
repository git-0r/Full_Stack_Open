import React from "react"
import { render, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import BlogForm from "./BlogForm"

test("<BlogForm/> calls the event handler with right details when new blog is created", () => {
    const createNewBlog = jest.fn()

    const component = render(
        <BlogForm createNewBlog={createNewBlog} />
    )

    const form = component.container.querySelector("form")
    const title = component.container.querySelector("#title")
    const author = component.container.querySelector("#author")
    const url = component.container.querySelector("#url")

    fireEvent.change(title, {
        target: { value: "testing a form component" }
    })
    fireEvent.change(author, {
        target: { value: "jack" }
    })
    fireEvent.change(url, {
        target: { value: "http://test.com" }
    })

    fireEvent.submit(form)

    expect(createNewBlog.mock.calls).toHaveLength(1)
    expect(createNewBlog.mock.calls[0][0].title).toBe("testing a form component")
    expect(createNewBlog.mock.calls[0][0].author).toBe("jack")
    expect(createNewBlog.mock.calls[0][0].url).toBe("http://test.com")


})