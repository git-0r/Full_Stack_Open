import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import { useSubscription, useApolloClient } from '@apollo/client'
import { allBooks, BOOK_ADDED } from './queries'

export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }
  cache.updateQuery({ ...query, variables: { genre: null } }, ({ allBooks }) => {
    console.log(uniqByName(allBooks.concat(addedBook)))
    if (allBooks) {
      return {
        "allBooks": uniqByName(allBooks.concat(addedBook)),
      }
    }
  })
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      alert("New book added: " + subscriptionData.data.bookAdded.title)
      const addedBook = subscriptionData.data.bookAdded
      console.log(client.cache.readQuery({ query: allBooks, variables: { "genre": null } }))
      updateCache(client.cache, { query: allBooks }, addedBook)
    }
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {
          token
            ? <>
              <button onClick={() => setPage("recommend")}>recommend</button>
              <button onClick={logout}>logout</button>
            </>
            : <button onClick={() => setPage("login")}>login</button>}
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <LoginForm show={page === "login"} setToken={setToken} setPage={setPage} />
      {token && <Recommend show={page === "recommend"} setPage={setPage} />}
    </div>
  )
}

export default App
