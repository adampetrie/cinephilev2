import { ApolloServer, IResolvers, gql } from "apollo-server";
import { MoviesAPI } from "./dataSources";

const typeDefs = gql`
  type Credits {
    id: ID
    cast: [Cast!]!
  }

  type Cast {
    id: ID
    character: String
    name: String
    movie: Movie!
  }

  type Movie {
    backdrop_path: String
    id: ID
    overview: String
    poster_path: String
    release_date: String
    tagline: String
    title: String
    credits: [Credits]
  }

  type Query {
    movie(id: ID!): Movie
    credits(id: ID): Credits
  }
`;

const resolvers: IResolvers = {
  Query: {
    movie: async (obj, { id }, { dataSources }) => {
      return dataSources.moviesAPI.getMovie(id);
    },

    credits: async (obj, { id }, { dataSources }) => {
      return dataSources.moviesAPI.getCast(id);
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      moviesAPI: new MoviesAPI()
    };
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
