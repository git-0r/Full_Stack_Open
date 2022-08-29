import { useMutation, useQuery } from "@apollo/client"
import { useState } from "react"
import { allAuthors, editAuthor } from "../queries"
import Select from 'react-select'

const Authors = (props) => {
  const [name, setName] = useState("")
  const [born, setBorn] = useState("")
  let authors = []
  const result = useQuery(allAuthors);
  const [editBornYear] = useMutation(editAuthor, { refetchQueries: [{ query: allAuthors }] })

  if (!props.show || !result.data) {
    return null
  }
  authors = [...authors, ...result?.data?.allAuthors];

  const updateAuthor = (e) => {
    e.preventDefault()
    editBornYear({ variables: { name, setBornTo: Number(born) } })
    setBorn("")
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.books.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={updateAuthor}>
        <Select onChange={(e) => setName(e.value)} options={authors?.map(author => ({ value: author.name, label: author.name }))} />
        <label htmlFor="born">born</label>
        <input type="text" id="born" value={born} onChange={(e) => setBorn(e.target.value)} />
        <button>update author</button>
      </form>
    </div>
  )
}

export default Authors
