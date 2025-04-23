const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  ingredients: [String], // Array of ingredient names
  fullRecipe: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
  // You might want to add a reference to the basket items used
});

module.exports = mongoose.model('Recipe', RecipeSchema);