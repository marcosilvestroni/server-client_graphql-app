const graphql = require("graphql");
const Book = require("../models/book");
const AuthorType = require("./author.graph").AuthorType;

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return Author.findById(parent.authorid);
      }
    }
  })
});

const Queries = {
  book: {
    type: BookType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
      return Book.findById(args.id);
    }
  },

  books: {
    type: new GraphQLList(BookType),
    resolve(parent, args) {
      return Book.find({});
    }
  }
};

const Mutation = {
  addBook: {
    type: BookType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      genre: { type: GraphQLString },
      authorid: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve(parent, args) {
      let book = new Book({
        name: args.name,
        genre: args.genre,
        authorid: args.authorid
      });
      return book.save();
    }
  }
};

module.exports = { Mutation, Queries, BookType };
