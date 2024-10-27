import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';
import { WriterModel } from '../models/writer';
import { BookModel } from '../models/book';
import { COUNTRIES } from './const';

const CountryType = new GraphQLObjectType({
  name: 'Country',
  fields: {
    name: { type: GraphQLString },
    id: { type: GraphQLString },
  },
});

const WriterType = new GraphQLObjectType({
  name: 'Writer',
  fields: {
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    birthYear: { type: GraphQLInt },
    deathYear: { type: GraphQLInt },
    country: { type: GraphQLString },
    city: { type: GraphQLString },
  },
});

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: {
    id: { type: GraphQLID },
    authorId: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLString },
    year: { type: GraphQLInt },
    mainCharacters: { type: new GraphQLList(GraphQLString) },
    genre: { type: GraphQLString },
    author: {
      type: WriterType,
      resolve(parent, args) {
        return WriterModel.findById(parent.authorId);
      },
    },
  },
});

const query = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    countries: {
      type: new GraphQLList(CountryType),
      resolve(parent, args) {
        console.log({ COUNTRIES });
        console.log(COUNTRIES.map(country => ({ name: country, id: country })));
        return COUNTRIES.map(country => ({ name: country, id: country }));
      },
    },
    writer: {
      type: WriterType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return WriterModel.findById(args.id);
      },
    },
    writers: {
      type: new GraphQLList(WriterType),
      args: { country: { type: GraphQLString } },
      resolve(parent, args) {
        const filter = args.country ? { country: args.country } : {};
        return WriterModel.find(filter);
      },
    },
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return BookModel.findById(args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      args: {
        authorId: { type: GraphQLID },
        sortBy: { type: GraphQLString },
        order: { type: GraphQLString },
      },
      resolve(parent, args) {
        console.log({ args });
        const filter = args.authorId ? { authorId: args.authorId } : {};
        const sort = args.sortBy
          ? { [args.sortBy]: args.order === 'ASC' ? 1 : -1 }
          : {};
        return BookModel.find(filter).sort(sort as any);
      },
    },
  },
});

export const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addWriter: {
      type: WriterType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        birthYear: { type: new GraphQLNonNull(GraphQLInt) },
        deathYear: { type: GraphQLInt },
        country: { type: new GraphQLNonNull(GraphQLString) },
        city: { type: GraphQLString },
      },
      resolve(parent, args) {
        const writer = new WriterModel({
          firstName: args.firstName,
          lastName: args.lastName,
          birthYear: args.birthYear,
          deathYear: args.deathYear,
          country: args.country,
          city: args.city,
        });
        return writer.save();
      },
    },
    deleteWriter: {
      type: WriterType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        BookModel.deleteMany({ authorId: args.id });
        return WriterModel.findByIdAndDelete(args.id);
      },
    },
    updateWriter: {
      type: WriterType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        birthYear: { type: new GraphQLNonNull(GraphQLInt) },
        deathYear: { type: GraphQLInt },
        country: { type: new GraphQLNonNull(GraphQLString) },
        city: { type: GraphQLString },
      },
      resolve(parent, args) {
        return WriterModel.findByIdAndUpdate(args.id, args, { new: true });
      },
    },
    addBook: {
      type: BookType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        year: { type: new GraphQLNonNull(GraphQLInt) },
        genre: { type: GraphQLString },
        mainCharacters: { type: new GraphQLList(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const book = new BookModel({
          title: args.title,
          year: args.year,
          genre: args.genre,
          mainCharacters: args.mainCharacters,
          authorId: args.authorId,
        });
        return book.save();
      },
    },
    updateBook: {
      type: BookType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        year: { type: new GraphQLNonNull(GraphQLInt) },
        genre: { type: GraphQLString },
        mainCharacters: { type: new GraphQLList(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return BookModel.findByIdAndUpdate(
          args.id,
          { $set: args },
          { new: true }
        );
      },
    },
    deleteBook: {
      type: BookType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return BookModel.findByIdAndDelete(args.id);
      },
    },
  },
});
export const schema = new GraphQLSchema({
  query,
  mutation,
});
