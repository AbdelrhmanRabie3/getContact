const loginService = require("../services/auth.service");

const loginController = async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = loginService(username, password);
    res.status(200).json({
      status: "success",
      data: {
        user: {
          username: result.username,
          role: result.role,
        },
        token: result.token,
      },
    });
  } catch (error) {
    res.status(401).json({
      status: "error",
      message: error.message,
    });
  }
};
module.exports = loginController;
