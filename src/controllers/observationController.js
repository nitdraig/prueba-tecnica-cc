const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const Joi = require("joi");

const create = async (req, res, next) => {
  try {
    const { date, description, celestialBodyId } = req.body;

    const celestialBody = await prisma.celestialBody.findUnique({
      where: { id: celestialBodyId },
    });

    if (!celestialBody) {
      return res.status(404).json({ message: "Celestial body not found" });
    }

    const observation = await prisma.observation.create({
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

const getAll = async (req, res, next) => {
  try {
    const observations = await prisma.observation.findMany({
      where: { userId: req.user.userId },
    });
    res.json(observations);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const { date, description, celestialBodyId } = req.body;
    const { id } = req.params;
    const observation = await prisma.observation.update({
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

    const observation = await prisma.observation.findUnique({
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
module.exports = { create, getAll, update, deleteObservation };
