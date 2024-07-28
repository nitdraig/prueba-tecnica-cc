const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const Joi = require("joi");

const createObservation = async (req, res, next) => {
  try {
    const { date, description, celestialBodyId } = req.body;

    const celestialBody = await prisma.celestialBodies.findUnique({
      where: { id: celestialBodyId },
    });

    if (!celestialBody) {
      return res.status(404).json({ message: "Celestial body not found" });
    }

    const observation = await prisma.observations.create({
      data: {
        date,
        description,
        celestialBodyId,
        userId: req.user.userId,
      },
    });

    res.status(201).json(observation);
  } catch (err) {
    next(err);
  }
};

const getAllObservation = async (req, res, next) => {
  try {
    const observations = await prisma.observations.findMany({
      where: { userId: req.user.userId },
    });
    res.json(observations);
  } catch (err) {
    next(err);
  }
};

const updateObservation = async (req, res, next) => {
  try {
    const { date, description, celestialBodyId } = req.body;
    const { id } = req.params;
    const observation = await prisma.observations.update({
      where: { id },
      data: { date, description, celestialBodyId },
    });
    res.json(observation);
  } catch (err) {
    next(err);
  }
};

const deleteObservation = async (req, res, next) => {
  try {
    const { id } = req.params;

    const observation = await prisma.observations.findUnique({
      where: { id },
    });

    if (!observation) {
      return res.status(404).json({ message: "Observation not found" });
    }

    await prisma.observation.delete({
      where: { id },
    });

    res.json({ message: "Observation deleted successfully" });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  createObservation,
  getAllObservation,
  updateObservation,
  deleteObservation,
};
