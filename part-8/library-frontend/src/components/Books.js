import { useQuery } from "@apollo/client"
import { useState } from "react"
import { allBooks } from "../queries"

const Books = (props) => {
  const [filter, setFilter] = useState(null);
  const result = useQuery(allBooks, { variables: { genre: filter } })
  let books = []
  if (!props.show || !result.data) {
    return null
  }
  books = [...books, ...result.data.allBooks]

  const setQueryValue = (e) => {
    const value = e.target.dataset.value
    setFilter(value === "all" ? null : value)
  }

  return (
    <div>
      <h1>Books</h1>
      <h2>In genre {!filter ? "all" : filter}</h2>
      <div onClick={setQueryValue}>
        <button data-value="refactoring">refactoring</button>
        <button data-value="agile">agile</button>
        <button data-value="patterns">patterns</button>
        <button data-value="design">design</button>
        <button data-value="crime">crime</button>
        <button data-value="classic">classic</button>
        <button data-value="all">all genres</button>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
