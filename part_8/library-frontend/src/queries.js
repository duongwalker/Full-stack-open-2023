import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
        name,
        born,
        bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title,
      author,
      published
  }
  }
`

export const UPDATE_AUTHOR = gql`
  mutation updateAuthor($name: String!, $setBornTo: String!) {
    editAuthor(
      name: $name,
      setBornTo: $setBornTo
    ) {
      name,
      born
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: String!, $genres: [String]!) {

      addBook(
        title: $title,
        author: $author,
        published: $published,
        genres: $genres
      ) {
        title
        author
        published
        genres
      }

  }
`