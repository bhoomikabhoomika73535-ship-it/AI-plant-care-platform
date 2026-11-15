const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes =
  require("./routes/authroutes.js");

const plantRoutes =
  require("./routes/plantroutes.js");

const userPlantRoutes =
  require("./routes/userplantroutes.js");


const app = express();


// ===============================
// MIDDLEWARE
// ===============================

app.use(cors());

app.use(express.json());


// ===============================
// ROUTES
// ===============================

app.get("/", (req, res) => {

  res.json({
    message: "🌿 PlantAI API is running"
  });

});

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/plants",
  plantRoutes
);

app.use(
  "/api/user-plants",
  userPlantRoutes
);


// ===============================
// MONGODB
// ===============================

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {

    console.log(
      "✅ MongoDB connected"
    );

    const PORT =
      process.env.PORT || 5000;

    app.listen(PORT, () => {

      console.log(
        `🚀 Server running on http://localhost:${PORT}`
      );

    });

  })
  .catch((error) => {

    console.error(
      "❌ MongoDB connection failed:",
      error.message
    );

  });
