const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAll = async (req, res) => {
  try {
    const celestialBodies = await prisma.celestialBody.findMany();
    res.json(celestialBodies);
  } catch (err) {
    res.status(500).json({
      message: "Error retrieving celestial bodies",
      error: err.message,
    });
  }
};

const create = async (req, res) => {
  try {
    const { name } = req.body;
    const celestialBody = await prisma.celestialBody.create({
      data: { name },
    });
    res.status(201).json(celestialBody);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating celestial body", error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const celestialBody = await prisma.celestialBody.findUnique({
      where: { id },
    });

    if (!celestialBody) {
      return res.status(404).json({ message: "Celestial body not found" });
    }

    const updatedCelestialBody = await prisma.celestialBody.update({
      where: { id },
      data: { name },
    });

    res.json(updatedCelestialBody);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating celestial body", error: err.message });
  }
};

const deleteCelestialBody = async (req, res) => {
  try {
    const { id } = req.params;

    const celestialBody = await prisma.celestialBody.findUnique({
      where: { id },
    });

    if (!celestialBody) {
      return res.status(404).json({ message: "Celestial body not found" });
    }

    await prisma.celestialBody.delete({
      where: { id },
    });

    res.json({ message: "Celestial body deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting celestial body", error: err.message });
  }
};

module.exports = { getAll, create, update, deleteCelestialBody };
