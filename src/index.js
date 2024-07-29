const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const celestialBodiesRoutes = require("./routes/celestialBodiesRoutes");
const observationsRoutes = require("./routes/observationsRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware");

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/celestialBodies", celestialBodiesRoutes);
app.use("/api/observations", observationsRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
