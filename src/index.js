const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");
const logger = require("./config/logger");

const { ApolloServer } = require("apollo-server-express");
const userSchema = require("../src/module/user/user.schema");
const userController = require("../src/module/user/user.controller");

const server = new ApolloServer({
  typeDefs: userSchema,
  resolvers: userController,
});

const connectDB = () => {
  mongoose
    .connect(config.mongoose.url, config.mongoose.options)
    .then(() => {
      logger.info("Connected to MongoDB");

      server.start().then((res) => {
        server.applyMiddleware({ app });

        // Starting Express server
        app.listen({ port: 4000 }, () =>
          console.log(
            `Server is running at http://localhost:4000${server.graphqlPath}`
          )
        );
      });
      // server = app.listen(config.port, () => {
      //   logger.info(`Listening to port ${config.port}`);
      // });
    })
    .catch((error) => {
      connectDB();
      console.log("error", error);
    });
};
connectDB();

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
