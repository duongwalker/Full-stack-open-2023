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

// export const FIND_PERSON = gql`
//   query findPersonByName($nameToSearch: String!) {
//     // ...
//   }
// `

export const CREATE_BOOK = gql`
  mutation createPerson($title: String!, $author: String!, $published: String!, $genres: [String]!) {

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