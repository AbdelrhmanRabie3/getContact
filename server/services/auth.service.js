const jwt = require("jsonwebtoken");

exports.login = (username, password) => {
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (!user) {
    throw new Error("Invalid username or password");
  }
  const token = jwt.sign(
    { username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return {
    token,
    username: user.username,
    role: user.role,
  };
};
