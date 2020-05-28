import express from "express";
import { ApolloServer, gql} from "apollo-server-express";
import bodyParser from "body-parser"
import cors from "cors";
import cookieParser from "cookie-parser"
import {resolvers} from "./graphql/resolver";
import { typeDefs } from "./graphql/typeDefs";
import initDB from "./db/mongo"
import user from "./rest/routes/user"

const server = async () => {
  const app = express();
  app.use(cookieParser());
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  app.use(cors());
  app.use(bodyParser.json());

  //graphql exams
  server.applyMiddleware({app});

  await initDB();
  //auth for dash
  app.use("/api/v1/user", user);

  app.listen({port: 4001}, ()=> {
    console.log('==============API Running=============')
  })

};

server().then(() => console.log('Start'));