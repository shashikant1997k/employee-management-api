const Joi = require("joi");
const { password, objectId } = require("../../validations/custom.validation");

const createUser = {
  body: Joi.object().keys({
    FirstName: Joi.string().required(),
    LastName: Joi.string().required(),
    UserName: Joi.string().required(),
    EmployeeCode: Joi.string().required(),
    Department: Joi.string().allow(""),
    Mobile: Joi.string().required(),
    Email: Joi.string().required().email(),
    Password: Joi.string().required().custom(password),
    UserRole: Joi.number().required(),
    CompanyCode: Joi.array().required(),
    Active: Joi.string().default(true),
    Remark: Joi.string().allow(""),
    // ProfilePhoto: Joi.string().required(),
  }),
};
const getUsers = {
  body: Joi.object().keys({
    UserRole: Joi.number().allow(""),
    sortBy: Joi.string().required(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      FirstName: Joi.string().required(),
      LastName: Joi.string().required(),
      UserName: Joi.string().required(),
      EmployeeCode: Joi.string().required(),
      Department: Joi.string().allow(""),
      Mobile: Joi.string().required(),
      Email: Joi.string().required().email(),
      UserRole: Joi.number().required(),
      CompanyCode: Joi.array().required(),
      Password: Joi.string().allow("").custom(password),
      Active: Joi.string().required(),
      Remark: Joi.string().allow(""),
      // ProfilePhoto: Joi.string().required(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
