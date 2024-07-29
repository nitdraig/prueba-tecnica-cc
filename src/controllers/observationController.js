const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const Joi = require("joi");

const observationSchema = Joi.object({
  date: Joi.date().required(),
  description: Joi.string().required(),
  celestialBodyId: Joi.string().required(),
});
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
        celestialBodiesId: celestialBodyId,
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
    const { error } = observationSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ message: `Validation error: ${error.message}` });
    }

    const { date, description, celestialBodyId } = req.body;
    const { id } = req.params;

    const existingObservation = await prisma.observations.findUnique({
      where: { id },
    });

    if (!existingObservation) {
      return res.status(404).json({ message: "Observation not found" });
    }

    const celestialBody = await prisma.celestialBodies.findUnique({
      where: { id: celestialBodyId },
    });

    if (!celestialBody) {
      return res.status(404).json({ message: "Celestial body not found" });
    }

    const updatedObservation = await prisma.observations.update({
      where: { id },
      data: { date, description, celestialBodiesId: celestialBodyId },
    });

    res.json(updatedObservation);
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

    await prisma.observations.delete({
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
