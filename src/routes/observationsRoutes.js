const express = require("express");
const router = express.Router();
const {
  createObservation,
  getAllObservation,
  updateObservation,
  deleteObservation,
} = require("../controllers/observationController");
const validate = require("../middlewares/validationMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const Joi = require("joi");

const observationsSchema = Joi.object({
  date: Joi.date().required(),
  description: Joi.string().required(),
  celestialBodyId: Joi.string().required(),
});

router.post(
  "/",
  authMiddleware,
  validate(observationsSchema),
  createObservation
);

router.get("/", authMiddleware, getAllObservation);

router.put(
  "/:id",
  authMiddleware,
  validate(observationsSchema),
  updateObservation
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteObservation
);

module.exports = router;
