import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { Book } from "../components";

import { search } from "../common/BooksAPI";

const Search = ({booksList, onBookUpdate }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleDebouncedSearchTermChange = (event) => {
    setDebouncedSearchTerm(event.target.value);
  };

  useEffect(() => {
    const debouncedSearch = setTimeout(
      () => setSearchTerm(debouncedSearchTerm),
      1000
    );

    return () => clearTimeout(debouncedSearch);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    const searchBooks = async () => {
      try {
        const books = await search(searchTerm, 1000);

        if (books.length > 0) {
          const searchListWithShelf = books.map((book) => {
            const bookItem = booksList.find((bookItem) => bookItem.id === book.id);
            if (bookItem) {
              return bookItem;
            }
            return book;
          });
          setSearchResults(searchListWithShelf);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (searchTerm) {
      searchBooks();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, booksList]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={handleDebouncedSearchTermChange}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchResults.length > 0 &&
            searchResults.map((book) => (
              <li key={book?.id}>
                <Book book={book} onBookUpdate={onBookUpdate} />
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
};

Search.propTypes = {
  booksList: PropTypes.array.isRequired,
  onBookUpdate: PropTypes.func.isRequired,
};

export default Search;
