import express from "express";
import { resolvers, typeDefs } from "./schema/schema";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { graphqlHTTP } from "express-graphql";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import authMiddleware from "./middleware/auth-middleware";
import { graphqlUploadExpress } from "graphql-upload";
import { ApolloServer, gql } from "apollo-server-express";
import { AuthMutations, AuthQueries } from "./schema/auth/auth";
import { expressMiddleware } from "@apollo/server/express4";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const corsCredentials = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(bodyParser.json());
app.use(cookieParser());
app.use(graphqlUploadExpress({ maxFiles: 10 }));

let apolloServer = null;

async function startServer() {
  apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => {
      return { req, res };
    },
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: corsCredentials, authMiddleware });
}
startServer();

async function startDB() {
  await mongoose.connect(process.env.MONGO_DB_KEY, () => {
    console.log("Connect to database is success!");
  });
}

startDB();

app.listen(PORT, () => console.log("Server has been started!", PORT));

// app.use(authMiddleware);
//
// app.use(
//   "/graphql",
//   graphqlUploadExpress({ maxFiles: 10 }),
//   graphqlHTTP((req, res) => {
//     return {
//       schema,
//       graphiql: { headerEditorEnabled: true },
//       context: {
//         req,
//         res,
//       },
//     };
//   })
// );
