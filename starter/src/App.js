import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { Search, MyReads } from "./pages";

import { getAll, update } from "./common/BooksAPI";

import "./App.css";

const App = () => {
  const [booksList, setBooksList] = useState([]);

  /**
   * @description This function is used to get all books from the API
   * 
   * @returns {void}
   */
  const fetchBooks = async () => {
    console.log("fetchBooks");
    try {
      const books = await getAll();
      setBooksList([...books]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBooks();

    return () => {
      setBooksList([]);
    };
  }, []);

  /**
   * @description Update the book shelf
   *
   * @param {Object} book Object of book to be updated
   * @param {string} shelf shelf to be updated or removed
   */
  const updateBook = (book, shelf) => {
    // console.log("updateBook", book, shelf);
    update(book, shelf);
    setBooksList((prevBooksList) => {
      const updatedBooksList = [...prevBooksList];
      const bookIndex = updatedBooksList.findIndex(bookItem => bookItem.id === book.id);
      console.log("bookIndex", bookIndex);
      if (bookIndex > -1) {
        updatedBooksList[bookIndex].shelf = shelf;
      }
      return updatedBooksList;
    });
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<MyReads booksList={booksList} onBookUpdate={updateBook} onFetchBooks={fetchBooks} />}
      />
      <Route
        path="/search"
        element={<Search booksList={booksList} onBookUpdate={updateBook} />}
      />
    </Routes>
  );
};

export default App;
