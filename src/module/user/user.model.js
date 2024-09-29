const mongoose = require("mongoose");
const validator = require("validator");
const { toJSON, paginate } = require("../../utils/plugins");

const userSchema = mongoose.Schema(
  {
    FirstName: {
      type: String,
      required: true,
      trim: true,
    },
    LastName: {
      type: String,
      trim: true,
    },
    Age: {
      type: Number,
      trim: true,
      default: 0,
    },
    DateOfJoining: {
      type: String,
      trim: true,
      default: "",
    },
    EmployeeCode: {
      type: String,
      trim: true,
      default: "",
    },
    Department: {
      type: String,
      trim: true,
      default: "",
    },
    Title: {
      type: String,
      required: true,
      trim: true,
    },
    CurrentStatus: {
      type: Number,
      default: 1,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(toJSON);
userSchema.plugin(paginate);

const User = mongoose.model("user", userSchema, "coll_user");

module.exports = { User, userSchema };
