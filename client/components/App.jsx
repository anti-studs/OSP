import React, { Component, useState } from "react";
import BookDisplay from "./BookDisplay.jsx";

const App = (props) => {
  //http://localhost:3000/bookshelf

  const [books, setBooks] = useState(null);
  let bookList = [];
  return (
    <main>
      <div className="btnContainer">
        <button
          type="button"
          onClick={async () => {
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
          }}
        >
          Get All Books
        </button>
      </div>
      <div className="booksContainer">{books}</div>
    </main>
  );
};

export default App;
