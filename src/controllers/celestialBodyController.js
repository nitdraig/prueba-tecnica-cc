const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAll = async (req, res) => {
  const celestialBodies = await prisma.celestialBody.findMany();
  res.json(celestialBodies);
};

const create = async (req, res) => {
  const { name } = req.body;
  const celestialBody = await prisma.celestialBody.create({
    data: { name },
  });
  res.status(201).json(celestialBody);
};

module.exports = { getAll, create };
