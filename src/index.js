import { GraphQLServer, PubSub } from 'graphql-yoga'
import uuidv4 from 'uuid/v4'
import db from './db'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import Subscription from './resolvers/Subscription'
import Comment from './resolvers/Comment'
import Post from './resolvers/Post'
import User from './resolvers/User'

// PubSub from graphql-subscriptions for subscriptions which is supposed to share across resolvers
const pubsub = new PubSub();

// type def in schema.graphql.
// resolvers for mutation, query and relational data are under /resolvers directory 
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        Subscription,
        User,
        Comment,
        Post
    },
    context: {
        db,
        pubsub
    }
})

server.start(() => {
    console.log('The server is up!')
})