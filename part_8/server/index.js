const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const { GraphQLError } = require('graphql')

let authors = [
    {
        name: 'Robert Martin',
        id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
        born: 1952,
    },
    {
        name: 'Martin Fowler',
        id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
        born: 1963
    },
    {
        name: 'Fyodor Dostoevsky',
        id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
        born: 1821
    },
    {
        name: 'Joshua Kerievsky', // birthyear not known
        id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
    },
    {
        name: 'Sandi Metz', // birthyear not known
        id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
    },
]

/*

 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book

*/

let books = [
    {
        title: 'Clean Code',
        published: 2008,
        author: 'Robert Martin',
        id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Agile software development',
        published: 2002,
        author: 'Robert Martin',
        id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
        genres: ['agile', 'patterns', 'design']
    },
    {
        title: 'Refactoring, edition 2',
        published: 2018,
        author: 'Martin Fowler',
        id: "afa5de00-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Refactoring to patterns',
        published: 2008,
        author: 'Joshua Kerievsky',
        id: "afa5de01-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'patterns']
    },
    {
        title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
        published: 2012,
        author: 'Sandi Metz',
        id: "afa5de02-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'design']
    },
    {
        title: 'Crime and punishment',
        published: 1866,
        author: 'Fyodor Dostoevsky',
        id: "afa5de03-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'crime']
    },
    {
        title: 'Demons',
        published: 1872,
        author: 'Fyodor Dostoevsky',
        id: "afa5de04-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'revolution']
    },
]

/*
  you can remove the placeholder query once your first one has been implemented
*/

const typeDefs = `

  type Book {
    title: String!
    author: String!
    published: Int!
    genres: [String]!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }
  type Query {
    dummy: Int
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
        title: String!
        author: String!
        published: String!
        genres: [String]!
    ): Book

    editAuthor(
        name: String!
        setBornTo: String!
    ): Author
  }
`

const resolvers = {
    Query: {
        dummy: () => 0,
        bookCount: () => books.length,
        authorCount: () => authors.length,
        allBooks: (root, args) => {
            let filteredBooks = books;
            if (args.genre) {
                filteredBooks = filteredBooks.filter(book => book.genres.includes(args.genre));
            }

            if (args.author) {
                filteredBooks = filteredBooks.filter(book => book.author === args.author);
            }
            return filteredBooks
        },
        allAuthors: () => {
            return authors.map(author => ({
                ...author,
                bookCount: books.filter(book => book.author === author.name).length // Count books per author
            }));
        },
    },
    Mutation: {
        addBook: (root, args) => {
            if (books.find((b) => b.title == args.title)) {
                throw new GraphQLError('Name must be unique', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.title
                    }
                })
            }
            const book = { ...args }
            books = books.concat(book)
            if (!(authors.find((a) => a.name == book.author))) {
                authors = authors.concat({
                    name: book.author,
                    born: null,
                    id: uuid()
                })
            }
            return book
        },
        editAuthor: (root, args) => {
            let birthyear = args.setBornTo
            const author = authors.find((a) => a.name === args.name)
            if (!author) {
                return null
            }
            const updatedAuthor = { ...author, born: birthyear }
            authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
            return updatedAuthor
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

startStandaloneServer(server, {
    listen: { port: 4000 },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})