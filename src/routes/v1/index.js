const { graphqlHTTP } = require("express-graphql");
const userSchema = require("../../module/user/user.schema");
const userController = require("../../module/user/user.controller");

const graphqlRoute = graphqlHTTP({
  schema: userSchema,
  rootValue: userController,
  graphiql: true, // Enable GraphiQL interface
});

module.exports = graphqlRoute;
