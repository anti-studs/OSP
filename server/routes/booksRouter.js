const express = require('express');
const booksController = require('../controller/booksController');
const router = express.Router();

// View all books
router.get('/', booksController.view, (req, res) => {
  res.json(res.locals.allEntries);
});

module.exports = router;