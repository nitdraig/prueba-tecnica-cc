const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const celestialBodiesController = require("../controllers/celestialBodiesController");

router.get("/", celestialBodiesController.getAllCelestialBodies);

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  celestialBodiesController.createCelestialBodies
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  celestialBodiesController.updateCelestialBodies
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  celestialBodiesController.deleteCelestialBodies
);

module.exports = router;
