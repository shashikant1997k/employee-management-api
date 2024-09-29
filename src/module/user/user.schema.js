const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    getUsers(filter: UserFilterInput, options: QueryOptions): UserResponse
    getUser(userId: ID!): User
  }

  type Mutation {
    createUser(input: CreateUserInput!): UserResponse
    updateUser(userId: ID!, input: UpdateUserInput!): UserResponse
    deleteUser(userId: ID!): UserResponse
  }

  input UserFilterInput {
    CompanyCode: String
    UserRole: String
  }

  input QueryOptions {
    sortBy: String
    limit: Int
    page: Int
  }

  input CreateUserInput {
    FirstName: String!
    LastName: String
    Age: Int
    EmployeeCode: String!
    Department: String
    Title: String!
  }

  input UpdateUserInput {
    FirstName: String
    LastName: String
    Age: Int
    EmployeeCode: String
    Department: String
    Title: String
  }

  type User {
    id: ID!
    FirstName: String!
    LastName: String
    Age: Int
    EmployeeCode: String!
    Department: String
    Title: String!
    CurrentStatus: Int
  }

  type UserResponse {
    status: Int
    message: String
    data: User
  }
`;

module.exports = typeDefs;
