const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { key } = require('../config/key');

const generateAccessToken = (id, roles) => {
  const payload = { id, roles };

  return jwt.sign(payload, key, { expiresIn: "24h" });
};

class AuthController {
    async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });

            if (!user) {
                return res.status(400).json({ message: 'User not found' });
            }

            const isValidPassword = bcrypt.compareSync(password, user.password);

            if (!isValidPassword) {
                return res(400).json({ message: 'Password is not valid' });
            }

            const token = generateAccessToken(user._id, user.roles);

            return res.json({ token });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Login error' });
        }
    };
}

module.exports = new AuthController();