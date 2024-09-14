const express = require("express");
const router = express.Router();
const verifyToken = require("../Middleware/middleware");

// Array to hold user favorite recipes
let favoriteRecipes = [];

// Add Recipe to Favorites
router.post("/add", verifyToken, (req, res) => {
  const { recipeId } = req.body;
  const userId = req.user.id;

  favoriteRecipes.push({ userId, recipeId });
  res.status(200).json({ message: "Recipe added to favorites!" });
});


router.get("/", verifyToken, (req, res) => {
  const userId = req.user.id;
  const userFavorites = favoriteRecipes.filter(fav => fav.userId === userId);

  res.status(200).json({ favorites: userFavorites });
});

module.exports = router;
