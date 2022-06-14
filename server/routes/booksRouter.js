const express = require('express');
const booksController = require('../controller/booksController');
const router = express.Router();

// View all books
router.get('/', booksController.view, (req, res) => {
  res.json(res.locals.allEntries);
});

// Add fetched books to database (to populate db)
// USE POSTMAN: POST - http://localhost:3000/bookshelf/populatedb
router.post('/populatedb', 
  booksController.fetchBooks, 
  booksController.addFetchedBooks, 
  (req, res) => res.json({})
);

module.exports = router;