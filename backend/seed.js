const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Plant = require("./models/plant.js");

dotenv.config();

const plants = [
  {
    name: "Snake Plant",
    scientificName: "Dracaena trifasciata",
    environment: "indoor",
    sunlight: "low",
    maintenance: "low",
    waterRequirement: "Water every 2–3 weeks",
    soil: "Well-draining soil",
    description: "A hardy indoor plant that needs very little maintenance."
  },

  {
    name: "ZZ Plant",
    scientificName: "Zamioculcas zamiifolia",
    environment: "indoor",
    sunlight: "low",
    maintenance: "low",
    waterRequirement: "Water every 2–3 weeks",
    soil: "Well-draining soil",
    description: "An easy-care plant that tolerates low light."
  },

  {
    name: "Peace Lily",
    scientificName: "Spathiphyllum",
    environment: "indoor",
    sunlight: "medium",
    maintenance: "medium",
    waterRequirement: "Water when the top soil feels dry",
    soil: "Moist, well-draining soil",
    description: "A beautiful indoor plant that enjoys indirect light."
  },

  {
    name: "Spider Plant",
    scientificName: "Chlorophytum comosum",
    environment: "indoor",
    sunlight: "medium",
    maintenance: "low",
    waterRequirement: "Water once a week",
    soil: "Well-draining potting soil",
    description: "A beginner-friendly plant that grows well indoors."
  },

  {
    name: "Rose",
    scientificName: "Rosa",
    environment: "outdoor",
    sunlight: "high",
    maintenance: "high",
    waterRequirement: "Water regularly when soil is dry",
    soil: "Rich, well-draining soil",
    description: "A flowering outdoor plant that needs plenty of sunlight."
  },

  {
    name: "Aloe Vera",
    scientificName: "Aloe barbadensis miller",
    environment: "outdoor",
    sunlight: "high",
    maintenance: "low",
    waterRequirement: "Water when soil is completely dry",
    soil: "Sandy, well-draining soil",
    description: "A low-maintenance succulent that enjoys bright sunlight."
  },

  {
    name: "Money Plant",
    scientificName: "Epipremnum aureum",
    environment: "indoor",
    sunlight: "medium",
    maintenance: "low",
    waterRequirement: "Water when the top soil becomes dry",
    soil: "Well-draining soil",
    description: "A popular and easy-to-grow indoor plant."
  },

  {
    name: "Jade Plant",
    scientificName: "Crassula ovata",
    environment: "outdoor",
    sunlight: "high",
    maintenance: "low",
    waterRequirement: "Water when soil is dry",
    soil: "Sandy, well-draining soil",
    description: "A low-maintenance succulent that loves bright light."
  }
];

async function seedPlants() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB connected");

    await Plant.deleteMany();

    await Plant.insertMany(plants);

    console.log("🌱 Plant data added successfully");

    await mongoose.connection.close();

    console.log("✅ Database connection closed");

  } catch (error) {

    console.error("❌ Error:", error.message);

    process.exit(1);
  }
}

seedPlants();