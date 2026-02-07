const AuthModel = require("../models/AuthModel");

// Login handler
const login = (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both username and password",
      });
    }

    const user = AuthModel.authenticateUser(username, password);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Username or Password is incorrect",
      });
    }

    // set cookie and session
    req.session.user = user;
    req.session.loggedIn = true;

    res.json({
      success: true,
      message: "Login successful",
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error logging in",
      error: error.message,
    });
  }
};


const logout = (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error logging out",
        });
      }
      res.json({
        success: true,
        message: "Logout successful",
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error getting current user",
      error: error.message,
    });
  }
};

const getCurrentUser = (req, res) => {
  try {
    if (!req.session.loggedIn) {
      return res.status(401).json({
        success: false,
        message: "Not logged in",
      });
    }

    res.json({
      success: true,
      user: req.session.user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "เกิดข้อผิดพลาด",
      error: error.message,
    });
  }
};

module.exports = {
  login,
  logout,
  getCurrentUser,
};
