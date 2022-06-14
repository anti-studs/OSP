import React, { Component, useState } from "react";
import BookDisplay from "./BookDisplay.jsx";

const App = (props) => {
  const [books, setBooks] = useState(null);
  const [time, setTime] = useState(null); 

  const getAllBooks = () => {
    const start = performance.now();
    fetch("/bookshelf")
      .then((res) => res.json())
      .then((data) => {
        const bookList = data.reduce((acc, elem, i) => {
          acc.push(<BookDisplay data={elem} key={i} />);
          return acc;
        }, []);
        const diff = (performance.now() - start).toFixed(2);
        setTime(diff);
        setBooks(bookList);
      })
      .catch((err) => console.log('bookshelf fetch error: ', err));
  }

  return (
    <main>
      <div className="cacheContainer">
        <p className="cacheDisplay">{time && <p>{ `Fetched in ${time} ms`}</p>}</p>
        <button type="button" onClick={getAllBooks}>
          Get All Books
        </button>
      </div>
      <div className="booksContainer">{books}</div>
    </main>
  );
};

export default App;
