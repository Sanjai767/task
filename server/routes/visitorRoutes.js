const express = require('express');
const router = express.Router();
const visitorController = require('../controllers/visitorController');

// Routes
router.post('/', visitorController.addVisitors);
router.get('/', visitorController.getVisitors);
router.delete('/:id', visitorController.deleteVisitor);
router.patch('/:id', visitorController.updateVisitor);

module.exports = router;
