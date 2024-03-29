import { gql } from "@apollo/client";

export const allAuthors = gql`
    query {
        allAuthors {
            name
            born
            books
        }
    }
`
export const allBooks = gql`
    query($author: String, $genre: String){
        allBooks(author: $author, genre: $genre) {
            id
            title
            published
            author {
                name
            }
        }
    }
`

export const addBook = gql`
    mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
        addBook(
            title: $title
            author: $author
            published: $published
            genres: $genres
        ) {
            id
            title
            published
            author {
                name
                id
            }
        }
    }
`
export const editAuthor = gql`
    mutation editAuthor($name: String!, $setBornTo: Int!){
        editAuthor(
            name: $name
            setBornTo: $setBornTo
        ) {
            born
        }
    }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ME = gql`
  query{
    me {
        username
        favouriteGenre
    }
  }
`
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
        id
        title
        published
        author {
            name
            id
        }
    }
  }
`