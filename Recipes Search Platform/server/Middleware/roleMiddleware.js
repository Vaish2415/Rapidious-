
const isAdmin = (req, res, next) => {
  const userRole = req.user.role;
  if (userRole === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied: Admins only." });
  }
};

module.exports = { isAdmin };
