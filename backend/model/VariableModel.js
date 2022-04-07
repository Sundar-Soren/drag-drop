const mongoose = require("mongoose");

const variableSchema = new mongoose.Schema(
  {
    variableValue: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Variable", variableSchema);
