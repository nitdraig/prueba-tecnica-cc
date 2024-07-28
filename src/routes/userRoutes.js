const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/userController");
const validate = require("../middlewares/validationMiddleware");
const Joi = require("joi");
const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("user", "admin").optional(),
});

router.post("/register", validate(userSchema), register);
router.post("/login", validate(userSchema), login);

module.exports = router;
