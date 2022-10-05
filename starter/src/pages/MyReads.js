import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { BookShelf } from "../components";

const MyReads = ({ booksList, onBookUpdate, onFetchBooks }) => {
  const [currentlyReadingList, setCurrentlyReadingList] = useState([]);
  const [wantToReadList, setWantToReadList] = useState([]);
  const [readList, setReadList] = useState([]);

  useEffect(() => {
    onFetchBooks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const arrangeBooks = useCallback(() => {
    booksList.forEach((book) => {
      if (book.shelf === "currentlyReading") {
        setCurrentlyReadingList((prevCurrentlyReading) => [
          ...prevCurrentlyReading,
          book,
        ]);
      } else if (book.shelf === "wantToRead") {
        setWantToReadList((prevWantToRead) => [...prevWantToRead, book]);
      } else if (book.shelf === "read") {
        setReadList((prevRead) => [...prevRead, book]);
      }
    });
  }, [booksList]);

  useEffect(() => {
    arrangeBooks();

    return () => {
      setCurrentlyReadingList([]);
      setWantToReadList([]);
      setReadList([]);
    }
  }, [booksList, arrangeBooks]);


  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookShelf
            bookShelfTitle="Currently Reading"
            booksList={currentlyReadingList}
            onBookUpdate={onBookUpdate}
          />
          <BookShelf
            bookShelfTitle="Want to Read"
            booksList={wantToReadList}
            onBookUpdate={onBookUpdate}
          />
          <BookShelf
            bookShelfTitle="Read"
            booksList={readList}
            onBookUpdate={onBookUpdate}
          />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

MyReads.propTypes = {
  booksList: PropTypes.array.isRequired,
  onBookUpdate: PropTypes.func.isRequired,
};

export default MyReads;
