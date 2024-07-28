const express = require("express");
const router = express.Router();
const { getAll, create } = require("../controllers/celestialBodyController");
const validate = require("../middlewares/validationMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const Joi = require("joi");

const celestialBodySchema = Joi.object({
  name: Joi.string().required(),
});

router.get("/", getAll);
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  validate(celestialBodySchema),
  create
);

module.exports = router;
