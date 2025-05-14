import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { GraphQLObjectType, GraphQLSchema, GraphQLList, GraphQLString, GraphQLInt } from 'graphql';
import { readFileSync } from 'fs';

const userData = JSON.parse(readFileSync('./MOCK_DATA.json', 'utf8'));

const app = express();
const PORT = 5000;

// Define UserType
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLInt },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});

// Define RootQuery for fetching users
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    getAllUsers: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return userData;
      },
    },
    findUserById: {
      type: UserType,
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        return userData.find((user) => user.id === args.id);
      },
    },
  },
});

// Define Mutation for creating a user
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
      },
      resolve(parent, args) {
        const newUser = {
          id: userData.length + 1,
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
        };
        userData.push(newUser);
        return newUser;
      },
    },
  },
});

// Create schema
const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

// Set up GraphQL middleware
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,  // This enables the GraphiQL interface
}));

// Start server
app.listen(PORT, () => {
  console.log(` ✔✔ Server running on http://localhost:${PORT}`);
});
