const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "UsersData.json");

const readJSON = () => {
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, "utf8"));
};
const writeJSON = (data) => {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf8");
};

const getAllUsers = () => {
  return readJSON();
};

const getUserByUsername = (username) => {
  const users = readJSON();
  return users.find((u) => u.username === username);
};

const getUserById = (userId) => {
  const users = readJSON();
  return users.find((u) => u.userId === userId);
};

const authenticateUser = (username, password) => {
  const user = getUserByUsername(username);
  if (user && user.password === password) {
    // Return user without password
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  return null;
};

const addUser = (userId, username, password, role, name) => {
  const users = readJSON();
  const newUser = {
    userId,
    username,
    password,
    role,
    name,
  };
  users.push(newUser);
  writeJSON(users);
  return newUser;
};



module.exports = {
  getAllUsers,
  getUserByUsername,
  getUserById,
  authenticateUser,
  addUser,
};
