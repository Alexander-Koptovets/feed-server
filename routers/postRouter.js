const Router = require('express');
const controller = require('../controllers/postController');
const paginateMiddleware = require('../middleware/paginateMiddleware');
const Post = require('../models/Post');
const roleMiddleware = require("../middleware/roleMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

const router = new Router();

router.get('/posts', paginateMiddleware(Post), controller.getPosts);
router.post('/posts', roleMiddleware(['ADMIN']), authMiddleware, controller.createPost);
router.put('/posts', roleMiddleware(['ADMIN']), authMiddleware, controller.update);
router.delete('/posts/:id', roleMiddleware(['ADMIN']), authMiddleware, controller.delete);

module.exports = router;