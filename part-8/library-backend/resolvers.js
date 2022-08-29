const { UserInputError } = require('apollo-server')
const Books = require("./models/book")
const Authors = require("./models/author")
const User = require("./models/user")
const jwt = require("jsonwebtoken")
const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
    Query: {
        bookCount: async () => Books.collection.countDocuments(),
        authorCount: async () => Authors.collection.countDocuments(),
        allBooks: async (root, args) => {
            const author = args.author;
            const genre = args.genre;
            console.log(author, genre)

            if (author && !genre) {
                const authorData = await Authors.findOne({ name: author })
                return await Books.find({ author: authorData._id })
            }
            if (!author && genre) return await Books.find({ genres: { $in: [genre] } }).populate("author")
            if (author && genre) {
                const authorData = await Authors.findOne({ name: author })
                return await Books.find({ author: authorData._id, genres: { $in: [genre] } })
            }
            return Books.find({}).populate("author");
        },
        allAuthors: async () => {
            const allAuthors = await Authors.find({})
            const data = allAuthors.map(async (author) => {
                const booksByAuthor = await Books.find({ author: author._id })
                return { bookCount: booksByAuthor.length, ...author.toObject() }
            })
            return data
        },
        me: (root, args, context) => {
            return context.currentUser
        }
    },
    Mutation: {
        addBook: async (root, args, context) => {
            const currentUser = context.currentUser

            if (!currentUser) {
                throw new AuthenticationError("not authenticated")
            }
            let author;
            const existingAuthor = await Authors.find({ name: args.author })
            try {
                if (existingAuthor?.length === 0) {
                    const newAuthor = new Authors({ name: args.author })
                    author = await newAuthor.save()
                }
                const newBook = new Books({ ...args, "author": author ? author._id : existingAuthor[0]._id })

                await newBook.save()
                const newBookFromDB = await Books.findOne({ title: args.title }).populate("author")
                pubsub.publish('BOOK_ADDED', { "bookAdded": newBookFromDB })
                await Authors.updateOne({ _id: author._id }, { $push: { books: newBookFromDB._id } })
                return { ...newBookFromDB, id: newBookFromDB._id }
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
        },
        editAuthor: async (root, args, context) => {
            const currentUser = context.currentUser

            if (!currentUser) {
                throw new AuthenticationError("not authenticated")
            }
            try {
                const updatedAuthor = await Authors.findOneAndUpdate({ name: args.name }, { born: args.setBornTo }, { new: true })
                return updatedAuthor
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args
                })
            }
        },
        createUser: async (root, args) => {
            const user = new User({ username: args.username, favouriteGenre: args.favouriteGenre })

            return user.save()
                .catch(error => {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== 'secret') {
                throw new UserInputError("wrong credentials")
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return { value: jwt.sign(userForToken, JWT_SECRET) }
        },
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
        },
    },
}

module.exports = resolvers