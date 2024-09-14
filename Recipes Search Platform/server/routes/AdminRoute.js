const express = require("express");
const router = express.Router();

let users = [
  { id: 1, username: "user1", role: "user" },
  { id: 2, username: "admin1", role: "admin" },
];

let recipes = [
  { id: 1, title: "Recipe 1", description: "Delicious Recipe 1" },
  { id: 2, title: "Recipe 2", description: "Delicious Recipe 2" },
];

router.get("/users", (req, res) => {
  res.status(200).json({ users });
});

router.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  users = users.filter(user => user.id != userId);

  res.status(200).json({ message: "User deleted successfully." });
});

router.get("/recipes", (req, res) => {
  res.status(200).json({ recipes });
});

module.exports = router;
