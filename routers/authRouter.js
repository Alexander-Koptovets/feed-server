const Router = require('express');
const controller = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = new Router();

router.post('/login', controller.login);

module.exports = router;