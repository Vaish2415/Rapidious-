const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const router = express.Router();
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");

app.use(express.json());
app.use(cors());
app.use(morgan("dev")); 

const config = require("./db/config");
const Home = require("./controllers/controller");
const LoginRoute = require("./routes/LoginRoute");
const RegisterRoute = require("./routes/RegisterRoute");
const verifyToken = require("./Middleware/middleware");
const RecipeRoute = require("./routes/RecipeRoute");
const ForgotPassword = require("./routes/forgotPassword");
const { isAdmin } = require("./Middleware/roleM]iddleware"); 

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
});
app.use(limiter);

app.use("/auth", LoginRoute);
app.use("/auth", RegisterRoute);
app.use("/auth", RecipeRoute);
app.use("/auth", ForgotPassword);

const FavoriteRoute = require("./routes/FavoriteRoute");
app.use("/favorites", verifyToken, FavoriteRoute);


const AdminRoute = require("./routes/AdminRoute");
app.use("/admin", verifyToken, isAdmin, AdminRoute);

router.get("/", verifyToken, Home.Home);
app.use("/auth", router);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "An unexpected error occurred",
    error: err.message || "Server error",
  });
});

if (config) {
  const PORT = process.env.PORT || 5000; 
  app.listen(PORT, () => {
    console.log(`Server Started on port ${PORT}`);
  });
}

module.exports = router;
