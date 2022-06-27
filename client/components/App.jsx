import React, { Component, useState } from "react";
import BookDisplay from "./BookDisplay.jsx";
//import memorizer from "../library.js";

class Node {
  constructor(key, val) {
    this.key = key;
    this.value = val;
    this.next = null;
    this.prev = null;
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map(); //TO-DO: override Map constructor to allow for capacity param
    this.head = null;
    this.tail = null;
  }

  get(key) {
    if (this.cache.has(key)) {
      let node = this.cache.get(key);
      this.moveToFront(node);
      return node.value;
    }
    return -1;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      let node = this.cache.get(key);
      node.value = value;
      this.moveToFront(node);
      return;
    }

    let node = new Node(key, value);

    if (this.cache.size === this.capacity) {
      this.cache.delete(this.tail.key);
      this.deleteNode(this.tail);
    }

    this.cache.set(key, node);
    this.addFirst(node);
    return;
  }

  moveToFront(node) {
    this.deleteNode(node);
    this.addFirst(node);
    return;
  }

  deleteNode(node) {
    let prevNode = node.prev;
    let nextNode = node.next;

    if (prevNode) {
      prevNode.next = nextNode;
    } else {
      this.head = nextNode;
    }

    if (nextNode) {
      nextNode.prev = prevNode;
    } else {
      this.tail = prevNode;
    }
    return;
  }

  addFirst(node) {
    node.next = this.head;
    node.prev = null;

    if (this.head) {
      this.head.prev = node;
    }
    this.head = node;

    if (!this.tail) {
      this.tail = node;
    }
    return;
  }
}

function memoizer(func) {
  let cache = new LRUCache(5);

  return async function (request) {
    console.log("Cache before functionality: ", cache);
    // let start = performance.now()
    //If not in cache, make fetch request 
    if (!cache.cache.has(request)) {
      console.log('Fetching from server and adding to cache');
      let response = await func(request);
      cache.put(request, response);
    }
    //Now already in cache so 
    // booksData is returning an array of Promises not an actual array!
    // Need to return array to display the books...
    const booksData = await cache.get(request)
    // let end = performance.now()
    // setTime((end - start).toFixed(2));
    // console.log("Duration: ", (end - start).toFixed(2), "ms");
    console.log("Returning: ", booksData);
    console.log("Cache after functionality: ", cache);
    return booksData;
  };
}

async function getAllBooksTest(url) {
  let response = await fetch(url)
    .then((res) => res.json())
    .then((data) => { return data; })
    .catch((err) => console.log('bookshelf fetch error: ', err));
  return response;
}

const test = memoizer(getAllBooksTest); // returns a new function that will check Cache before executing function;

const App = (props) => {
  const [books, setBooks] = useState(null);
  const [time, setTime] = useState(null);
  let bookList = [];

  async function serverReq() {
    const query = document.querySelector('#book-category').value
    let url;
    if (query === 'all') url = "/bookshelf"
    else url = '/bookshelf/' + query
    let start = performance.now()
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log('data: ', data);
        setTime((performance.now() - start).toFixed(2));
        bookList = data.reduce((acc, elem, i) => {
          acc.push(<BookDisplay data={elem} key={i} />);
          return acc;
        }, []);
        setBooks(bookList)
      })
      .catch((err) => console.log('bookshelf fetch error: ', err));
  }

  async function cacheReq() {
    const query = document.querySelector('#book-category').value;
    let url2;
    if (query === 'all') url2 = "/bookshelf";
    else (url2 = '/bookshelf/' + query);
    let start = performance.now();
    const books = await test(url2);
    let end = performance.now();
    setTime((end - start).toFixed(2));
    console.log("Duration: ", (end - start).toFixed(2), "ms");
    displayBooks(books);
  }

  function displayBooks(data) {
    bookList = data.reduce((acc, elem, i) => {
      acc.push(<BookDisplay data={elem} key={i} />);
      return acc;
    }, []);
    setBooks(bookList)
  }

  return (
    <main>
      <div className="cacheContainer">
        <label htmlFor="book-category">Choose a book category:</label>
        <select id="book-category">
          <option value='all'>All Books</option>
          <option value='microsoft'>Microsoft</option>
          <option value='python'>Python</option>
          <option value="javascript">Javascript</option>
          <option value="ruby">Ruby</option>
          <option value="mongodb">MongoDB</option>
          <option value="sql">SQL</option>
          <option value="cache">Cache</option>
          <option value="node">Node</option>
          <option value="it">IT</option>
          <option value="express">Express</option>
          <option value="cpu">CPU</option>
          <option value="media">Media</option>
          <option value="computer">Computer</option>
          <option value="query">Query</option>
        </select>
        <div className="cacheBtnContainer">
          <button type="button" className="getBtn" onClick={serverReq}>Get From Server</button>
          <button type="button" className="getBtn" onClick={cacheReq}>Get With Cache</button>
        </div>
        {time && <p className="cacheDisplay">{`Request Duration: ${time} ms`}</p>}
      </div>
      <div className="booksContainer">{books}</div>
    </main>
  );
};

export default App;