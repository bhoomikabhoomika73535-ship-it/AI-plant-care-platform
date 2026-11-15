const express = require("express");
const Plant = require("../models/plant.js");

const router = express.Router();


// =====================================
// GET ALL PLANTS
// =====================================

router.get("/", async (req, res) => {

  try {

    const plants = await Plant.find();

    res.json(plants);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Unable to get plants"
    });

  }

});


// =====================================
// GET PLANT RECOMMENDATIONS
// =====================================

router.get("/recommend", async (req, res) => {

  try {

    const {
      environment,
      sunlight,
      maintenance
    } = req.query;


    const plants = await Plant.find({
      environment: environment,
      sunlight: sunlight,
      maintenance: maintenance
    });


    res.json(plants);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Unable to get recommendations"
    });

  }

});


module.exports = router;