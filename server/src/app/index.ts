import express  from "express"
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { graphql } from "graphql";
import { User } from "./user/index";
import bodyParser from "body-parser";
export async function initServer() {
    const app=express();
    app.use(bodyParser.json())
    const server = new ApolloServer(
        {
            typeDefs:`
            ${User.types}
            type Query {
                ${User.queries}
            }
            `,
            resolvers:{
                Query:{
                   ...User.resolvers.queries
                }, 
            }
        }
    );
    await server.start();
    app.use('/graphql',expressMiddleware(server))
    return app;


}
