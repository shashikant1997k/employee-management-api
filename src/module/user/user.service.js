const httpStatus = require("http-status");
const Q = require("q");
const { User } = require("./user.model");
const ApiError = require("../../utils/ApiError");
const moment = require("moment");

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  const deferred = Q.defer();

  const createdUser = await User.create(userBody);

  const userObj = {
    status: httpStatus.OK,
    message: "User Created",
    data: createdUser,
  };
  deferred.resolve(userObj);
  return deferred.promise;
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const deferred = Q.defer();
  const users = await User.paginate(filter, options);
  const resObj = {
    status: httpStatus.OK,
    message: "List users",
    data: users,
  };
  deferred.resolve(resObj);
  return deferred.promise;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  const deferred = Q.defer();
  const result = await User.findById(id);
  const resObj = {
    status: httpStatus.OK,
    message: "List User",
    data: result,
  };
  deferred.resolve(resObj);
  return deferred.promise;
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const deferred = Q.defer();
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  Object.assign(user, updateBody);
  const result = await User.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        FirstName: updateBody.FirstName,
        LastName: updateBody.LastName,
        Age: updateBody.Age,
        EmployeeCode: updateBody.EmployeeCode,
        Department: updateBody.Department,
        DateOfJoining: updateBody.DateOfJoining,
        Title: updateBody.Title,
      },
    },
    { new: true }
  );

  const resObj = {
    status: httpStatus.OK,
    message: "User details Updated",
    data: result,
  };
  deferred.resolve(resObj);
  return deferred.promise;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const deferred = Q.defer();
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  const result = await User.updateOne(
    { _id: userId },
    { $set: { Status: 0 } },
    { new: true }
  );

  const resObj = {
    status: httpStatus.OK,
    message: "User Deleted",
    data: result,
  };

  deferred.resolve(resObj);
  return deferred.promise;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
