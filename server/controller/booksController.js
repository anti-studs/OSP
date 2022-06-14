
const { request } = require('express');
const Book = require('../model/bookModel.js');

const booksController = {};

booksController.view = (req, res, next) => {
  Book.find({}, (err, entries) => {
    //console.log(entries)
    // entries is an Array of all the entry objects
    res.locals.allEntries = entries;
    return next();
  })
}

module.exports = booksController;

