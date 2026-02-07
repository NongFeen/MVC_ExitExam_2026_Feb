const express = require("express");
const session = require("express-session");
const path = require("path");

const jobFairRoutes = require("./routes/jobFairRoutes");
const authController = require("./controllers/authController");
const { isAdmin } = require("./middleware/auth");

const app = express();

// Session middleware
app.use(
  session({
    secret: "your-secret-key-change-this",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 }, // 24 hours
  })
);

app.use("/css", express.static(path.join(__dirname, "views/css"))); //css

app.use(express.json());

//==================== AUTH ROUTES ====================
app.post("/api/auth/login", authController.login);
app.post("/api/auth/logout", authController.logout);
app.get("/api/auth/current", authController.getCurrentUser);

//==================== API ROUTES ====================
app.use("/api", jobFairRoutes);

//==================== PAGE ROUTES ====================
app.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    return res.redirect("/home");
  }
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.get("/", (req, res) => {
  res.redirect("/home");
});

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "home.html"));
});

app.get("/compensationRequest", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "compensationRequest.html"));
});

app.get("/compensationRequestList", (req, res) => {
  // Only admin can access this page
  if (!req.session.loggedIn) {
    return res.redirect("/login");
  }
  if (req.session.user.role !== "admin" && !isAdmin(req.session.user)) {
    return res.status(403).send(
      "<h1>Access Denied</h1><p>Only Admin can access this page.</p><a href='/home'>Back to Home</a>"
    );
  }
  res.sendFile(path.join(__dirname, "views", "compensationRequestList.html"));
});

app.listen(3000, () => {
  //server running
  console.log("Server is running on port 3000");
});
