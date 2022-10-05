import React from "react";
import PropTypes from "prop-types";

import { BOOK_SHELF_OPTIONS } from "../common/constants";

const Book = ({ book, onBookUpdate }) => {
  const bookCoverStyle = {
    width: 128,
    height: 193,
    backgroundImage: `url(${book?.imageLinks?.thumbnail})`,
  };

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={bookCoverStyle}></div>
        <div className="book-shelf-changer">
          <select
            defaultValue={book.shelf || "none"}
            onChange={(event) => onBookUpdate(book, event.target.value)}
          >
            {BOOK_SHELF_OPTIONS.map((shelfOption) => (
              <option
                value={shelfOption.value}
                key={shelfOption.name}
                disabled={shelfOption.name === "Move to..."}
              >
                {shelfOption.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="book-title">{book?.title}</div>
      <div className="book-authors">{book?.authors?.join(", ")}</div>
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onBookUpdate: PropTypes.func.isRequired,
};

export default Book;
