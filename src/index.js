import express from "express";
import mongoose from "mongoose";
import { ApolloServer, gql} from "apollo-server-express";
import {resolvers} from "./resolver";
import { typeDefs } from "./typeDefs";
import {Exam} from './models/Exam';

const server = async () => {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  server.applyMiddleware({app});
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/filtyr", {useNewUrlParser: true, useUnifiedTopology: true})
  }catch(err){
    console.log(err)
  }

  app.get('/', (req, res) => res.send('hello world'));

  app.listen({port: 4001}, ()=> {
    console.log('==============API Running=============')
  })

};

server();