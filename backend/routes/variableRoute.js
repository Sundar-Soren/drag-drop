const express = require("express");
const VariableModel = require("../model/VariableModel");

const router = express.Router();

router.post("/setVariable", async (req, res) => {
  try {
    const variableValues = await VariableModel.create(req.body);
    res.status(200).json({
      variableValues,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

router.get("/getVariable", async (req, res) => {
  try {
    const getValues = await VariableModel.find();
    res.status(200).json({
      getValues,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

router.put("/addVariable", async (req, res) => {
  try {
    const addedValues = await VariableModel.findByIdAndUpdate(
      req.body.id,
      {
        $addToSet: { variableValue: req.body.keyValue },
      },
      { new: true }
    );
    res.status(200).json({
      addedValues,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;
