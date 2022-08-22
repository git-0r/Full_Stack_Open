import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import Blog from "./Blog"
import { prettyDOM } from "@testing-library/dom"


test("renders content", () => {
    const blog = {
        title: "blog title",
        author: "me",
        url: "http://g.com"
    }

    const component = render(
        <Blog blog={blog} />
    )

    component.debug()

    const p = component.container.querySelector("p")
    console.log(prettyDOM(p))

    expect(component.container).toHaveTextContent(
        "blog title me"
    )

    const url = component.container.querySelector(".url")
    expect(url).toBeNull()

    const element = component.getByText(
        "blog title"
    )
    expect(element).toBeDefined()

    const div = component.container.querySelector(".blog")
    expect(div).toHaveTextContent(
        "blog title"
    )

})

describe("url & likes are shown when button is clicked", () => {

    let component

    const blog = {
        title: "blog title",
        author: "me",
        url: "http://g.com"
    }

    beforeEach(() => {
        component = render(
            <Blog blog={blog} />
        )
    })


    test("at start url & likes are not displayed", () => {
        const div = component.container.querySelector(".togglableContent")
        expect(div).toBeNull()
    })

    test("after clicking the button, url & likes are displayed", () => {
        const toggleBtn = component.container.querySelector(".toggleContent")

        fireEvent.click(toggleBtn)

        const div = component.container.querySelector(".togglableContent")
        expect(div).toBeDefined()
    })
})

test("if like button is clicked twice likeHandler is called twice", () => {
    const blog = {
        title: "blog title",
        author: "me",
        url: "http://g.com"
    }

    const mockHandler = jest.fn()

    const component = render(
        <Blog blog={blog} handleLike={mockHandler} />
    )

    const toggleBtn = component.container.querySelector(".toggleContent")

    fireEvent.click(toggleBtn)
    const btn = component.getByText("like")
    fireEvent.click(btn)
    fireEvent.click(btn)

    expect(mockHandler.mock.calls).toHaveLength(2)

})