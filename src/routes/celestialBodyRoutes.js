const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const celestialBodyController = require("../controllers/celestialBodyController");

router.get("/", celestialBodyController.getAllCelestialBodies);

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  celestialBodyController.createCelestialBodies
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  celestialBodyController.updateCelestialBodies
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  celestialBodyController.deleteCelestialBodies
);

module.exports = router;
