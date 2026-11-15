const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    scientificName: {
      type: String
    },

    environment: {
      type: String,
      enum: ["indoor", "outdoor"]
    },

    sunlight: {
      type: String,
      enum: ["low", "medium", "high"]
    },

    maintenance: {
      type: String,
      enum: ["low", "medium", "high"]
    },

    waterRequirement: {
      type: String
    },

    soil: {
      type: String
    },

    description: {
      type: String
    },

    image: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Plant", plantSchema);
