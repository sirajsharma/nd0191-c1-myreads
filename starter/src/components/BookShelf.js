import React from "react";
import PropTypes from "prop-types";

import { Book } from "../components";

const BookShelf = ({ bookShelfTitle, booksList, onBookUpdate }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{bookShelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {booksList.map((book) => (
            <li key={book.id}>
              <Book book={book} onBookUpdate={onBookUpdate} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

BookShelf.propTypes = {
  bookShelfTitle: PropTypes.string.isRequired,
  booksList: PropTypes.array.isRequired,
  onBookUpdate: PropTypes.func.isRequired,
};

export default BookShelf;
