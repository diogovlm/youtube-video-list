const { loginUser, logoutUser } = require('../services/authService.js');

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userId = await loginUser(email, password);
    res.json({ userId });
  } catch (error) {
    res.status(401).send(error.message);
  }
};

const logout = async (req, res) => {
  try {
    await logoutUser();
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { login, logout };
