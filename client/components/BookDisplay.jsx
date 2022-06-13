import React, { Component } from 'react';

const BookDisplay = props => {
  const {data} = props;

  return (
    <article className="bookDisplay">
      <ul className="bookLabel">
        <li className="bookDetail"><strong>{data.title}</strong> by {data.author}</li>
        {/* <li className="bookDetail">{data.description}</li> */}
      </ul>
    </article>
  );
};

export default BookDisplay;