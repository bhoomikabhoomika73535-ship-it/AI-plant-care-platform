const express = require("express");

const UserPlant = require("../models/userplant.js");
const authMiddleware = require("../middleware/authmiddleware.js");

const router = express.Router();


// ===============================
// GET USER'S PLANTS
// ===============================

router.get(
  "/",
  authMiddleware,
  async (req, res) => {

    try {

      const plants = await UserPlant.find({
        user: req.user.id
      }).populate("plant");

      res.json(plants);

    } catch (error) {

      res.status(500).json({
        message: "Unable to get your plants"
      });

    }

  }
);


// ===============================
// ADD PLANT
// ===============================

router.post(
  "/",
  authMiddleware,
  async (req, res) => {

    try {

      const {
        plantId,
        nickname,
        lastWatered,
        nextWatering
      } = req.body;

      const userPlant =
        await UserPlant.create({
          user: req.user.id,
          plant: plantId,
          nickname,
          lastWatered,
          nextWatering
        });

      const populated =
        await userPlant.populate("plant");

      res.status(201).json(populated);

    } catch (error) {

      res.status(500).json({
        message: "Unable to add plant"
      });

    }

  }
);


// ===============================
// UPDATE PLANT
// ===============================

router.put(
  "/:id",
  authMiddleware,
  async (req, res) => {

    try {

      const plant =
        await UserPlant.findOneAndUpdate(
          {
            _id: req.params.id,
            user: req.user.id
          },
          req.body,
          {
            new: true
          }
        ).populate("plant");

      if (!plant) {

        return res.status(404).json({
          message: "Plant not found"
        });

      }

      res.json(plant);

    } catch (error) {

      res.status(500).json({
        message: "Unable to update plant"
      });

    }

  }
);


// ===============================
// DELETE PLANT
// ===============================

router.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {

    try {

      const plant =
        await UserPlant.findOneAndDelete({
          _id: req.params.id,
          user: req.user.id
        });

      if (!plant) {

        return res.status(404).json({
          message: "Plant not found"
        });

      }

      res.json({
        message: "Plant removed"
      });

    } catch (error) {

      res.status(500).json({
        message: "Unable to delete plant"
      });

    }

  }
);


module.exports = router;
