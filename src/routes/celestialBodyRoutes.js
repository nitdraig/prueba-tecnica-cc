const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const celestialBodyController = require("../controllers/celestialBodyController");

router.get("/", celestialBodyController.getAll);

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  celestialBodyController.create
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  celestialBodyController.update
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  celestialBodyController.deleteCelestialBody
);

module.exports = router;
