const express = require("express");
const router = express.Router();
const {
  create,
  getAll,
  update,
  deleteObservation,
} = require("../controllers/observationController");
const validate = require("../middlewares/validationMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const Joi = require("joi");

const observationSchema = Joi.object({
  date: Joi.date().required(),
  description: Joi.string().required(),
  celestialBodyId: Joi.string().required(),
});

router.post("/", authMiddleware, validate(observationSchema), create);

router.get("/", authMiddleware, getAll);

router.put("/:id", authMiddleware, validate(observationSchema), update);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteObservation
);

module.exports = router;
