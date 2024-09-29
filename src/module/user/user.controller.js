const userService = require("./user.service");

const resolvers = {
  Query: {
    getUsers: async (_, { filter, options }) => {
      const resObj = await userService.queryUsers(filter, options);
      return resObj;
    },
    getUser: async (_, { userId }) => {
      const resObj = await userService.getUserById(userId);
      if (!resObj) throw new Error("User not found");
      return resObj.data;
    },
  },

  Mutation: {
    createUser: async (_, { input }) => {
      const resObj = await userService.createUser(input);
      return resObj;
    },
    updateUser: async (_, { userId, input }) => {
      const resObj = await userService.updateUserById(userId, input);
      return resObj;
    },
    deleteUser: async (_, { userId }) => {
      const resObj = await userService.deleteUserById(userId);
      return resObj;
    },
  },
};

module.exports = resolvers;
