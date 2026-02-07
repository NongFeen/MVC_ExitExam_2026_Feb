// Middleware to check if user is logged in
const isLoggedIn = (req, res, next) => {
  if (!req.session.loggedIn) {
    return res.redirect("/login");
  }
  next();
};

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (!req.session.loggedIn) {
    return res.redirect("/login");
  }

  if (req.session.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "เฉพาะ Admin เท่านั้นที่สามารถเข้าถึงหน้านี้ได้",
    });
  }

  next();
};

// Middleware to check if user is admin or user
const isUser = (req, res, next) => {
  if (!req.session.loggedIn) {
    return res.redirect("/login");
  }

  if (req.session.user.role !== "user" && req.session.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Not authorized to access",
    });
  }

  next();
};

module.exports = {
  isLoggedIn,
  isAdmin,
  isUser,
};
