const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const celestialBodyRoutes = require("./routes/celestialBodiesRoutes");
const observationRoutes = require("./routes/observationRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware");

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/celestialBodies", celestialBodyRoutes);
app.use("/api/observations", observationRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
