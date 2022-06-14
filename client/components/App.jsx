import React, { Component, useState } from "react";
import BookDisplay from "./BookDisplay.jsx";
//import memorizer from "../library.js";

const App = (props) => {
  const [books, setBooks] = useState(null);
  let bookList = [];
  async function getAllBooks() {
    let start = performance.now()
    await fetch("http://localhost:3000/bookshelf")
      .then((res) => res.json())
      .then((data) => {
        console.log('data: ', data);
        bookList = data.reduce((acc, elem, i) => {
          acc.push(<BookDisplay data={elem} key={i} />);
          return acc;
        }, []);
        setBooks(bookList)
      })
      .catch((err) => console.log('bookshelf fetch error: ', err));
  }

  function memoizer(func) {
    let cache = new Map();

    return async function (request) {
      //console.log("Cache before functionality: ", cache);
      //If not in cache, make fetch request 
      if (!cache.has(request)) {
        console.log('Fetching from server and adding to cache');
          let response = await func(request);
          cache.set(request, response);
        }
      //Now already in cache so 
      // booksData is returning an array of Promises not an actual array!
      // Need to return array to display the books...
      const booksData = await cache.get(request)
      console.log("Returning: ",booksData);
      return booksData;
    };
}

  async function getAllBooksTest(url) {
    let response = await fetch(url)
    .then((res) => res.json())
    .then((data) => { return data;})
    .catch((err) => console.log('bookshelf fetch error: ', err));
    return response;
  }

  function displayBooks(data) {
    bookList = data.reduce((acc, elem, i) => {
      acc.push(<BookDisplay data={elem} key={i} />);
      return acc;
    }, []);
    setBooks(bookList)
  }
  const test = memoizer(getAllBooksTest); // returns a new function that will check Cache before executing function;

  return (
    <main>
      <div className="btnContainer">
        <button
          type="button"
          onClick={getAllBooks}>Get All Books</button>
        <button type="button" onClick={() => {
          let start = performance.now()
          test('http://localhost:3000/bookshelf')
          let end = performance.now()
          console.log("Duration: ", (end - start).toFixed(2), "ms");
          }}> Get All Books Test 2 </button>
      </div>
      <div className="booksContainer">{books}</div>
    </main>
  );
};

export default App;