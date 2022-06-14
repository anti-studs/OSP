const { request, json } = require('express');
const Book = require('../model/bookModel.js');
const fetch = require('node-fetch');

const booksController = {};

booksController.view = (req, res, next) => {
  Book.find({}, (err, entries) => {
    console.log(entries)
    // entries is an Array of all the entry objects
    res.locals.allEntries = entries;
    return next();
  })
}

// Fetch Books From API - USE POSTMAN TO ADD
booksController.fetchBooks = async (req, res, next) => {
  res.locals.books = [];
  // Add keywords to search for books in API
  let keywords = [];
  for (let i = 0; i < keywords.length; i++) {
    const data = await fetch(`https://api.itbook.store/1.0/search/${keywords[i]}`);
    const json = await data.json();
    res.locals.books.push(...json.books);
  }
  return next();
}

// Add Books to Database From Fetched API
booksController.addFetchedBooks = (req, res, next) => {
  // console.log(res.locals.books);
  Book.insertMany(res.locals.books, (err, data) => {
    if (err) console.log('Error: ', err);
  });
  return next();
}

module.exports = booksController;
