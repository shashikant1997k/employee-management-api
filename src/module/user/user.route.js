const express = require("express");
const validate = require("../../middlewares/validate");
const userValidation = require("./user.validation");
const userController = require("./user.controller");
const router = express.Router();

router.post("/", validate(userValidation.getUsers), userController.getUsers);
router.post(
  "/create-user",
  validate(userValidation.createUser),
  userController.createUser
);

router
  .route("/:userId")
  .get(validate(userValidation.getUser), userController.getUser)
  .put(validate(userValidation.updateUser), userController.updateUser)
  .delete(validate(userValidation.deleteUser), userController.deleteUser);

module.exports = router;
