const graphql = require("graphql");
const Author = require("../models/author");
const Book = require("./book.graph");

const { BookType } = Book;

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const AuthorType = new GraphQLObjectType({
  name: "AuthorType",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({ authorid: parent.id });
      }
    }
  })
});

const Queries = {
  author: {
    type: AuthorType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
      return Author.findById(args.id);
    }
  },
  authors: {
    type: new GraphQLList(AuthorType),
    resolve(parent, args) {
      return Author.find({});
    }
  }
};

const Mutation = {
  addAuthor: {
    type: AuthorType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      age: { type: GraphQLInt }
    },
    resolve(parent, args) {
      let author = new Author({
        name: args.name,
        age: args.age
      });
      return author.save();
    }
  }
};

module.exports = { Queries, Mutation, AuthorType };
