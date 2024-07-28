const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllCelestialBodies = async (req, res) => {
  try {
    const celestialBodies = await prisma.celestialBodies.findMany();
    res.json(celestialBodies);
  } catch (err) {
    res.status(500).json({
      message: "Error retrieving celestial bodies",
      error: err.message,
    });
  }
};

const createCelestialBodies = async (req, res) => {
  try {
    const { name } = req.body;
    const celestialBodies = await prisma.celestialBodies.create({
      data: { name },
    });
    res.status(201).json(celestialBodies);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating celestial body", error: err.message });
  }
};

const updateCelestialBodies = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const celestialBodies = await prisma.celestialBodies.findUnique({
      where: { id },
    });

    if (!celestialBodies) {
      return res.status(404).json({ message: "Celestial body not found" });
    }

    const updatedcelestialBodies = await prisma.celestialBodies.update({
      where: { id },
      data: { name },
    });

    res.json(updatedcelestialBodies);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating celestial body", error: err.message });
  }
};

const deleteCelestialBodies = async (req, res, next) => {
  const { id } = req.params;

  try {
    const celestialBodies = await prisma.celestialBodies.findUnique({
      where: { id },
    });

    if (!celestialBodies) {
      return res.status(404).json({ message: "Celestial body not found" });
    }

    await prisma.observation.deleteMany({
      where: { celestialBodiesId: id },
    });

    await prisma.celestialBodies.delete({
      where: { id },
    });

    res.json({ message: "Celestial body deleted successfully" });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  getAllCelestialBodies,
  createCelestialBodies,
  updateCelestialBodies,
  deleteCelestialBodies,
};
