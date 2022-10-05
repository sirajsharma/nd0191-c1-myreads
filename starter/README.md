# MyReads Project

## Directories and files in src

.
├── App.css
├── App.js
├── common
│   ├── BooksAPI.js
│   └── constants.js
├── components
│   ├── Book.js
│   ├── BookShelf.js
│   └── index.js
├── icons
│   ├── add.svg
│   ├── arrow-back.svg
│   └── arrow-drop-down.svg
├── index.css
├── index.js
└── pages
├── MyReads.js
├── Search.js
└── index.js

- common folder contains all the shared constants and API used in the app
- component folder contains the all the common stateless components in the app. Index.js file is used for the clean named export.
- icons folders contains the icons used in the app
- pages folders includes all the pages which are created on the basis of the route and index.js file is used to export the pages from routes.

## TL;DR

To get started developing right away:

- install all project dependencies with `npm install`
- start the development server with `npm start`

## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

- [`getAll`](#getall)
- [`update`](#update)
- [`search`](#search)

### `getAll`

Method Signature:

```js
getAll();
```

- Returns a Promise which resolves to a JSON object containing a collection of book objects.
- This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf);
```

- book: `<Object>` containing at minimum an `id` attribute
- shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]
- Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query);
```

- query: `<String>`
- Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
- These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important

The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebook/create-react-app/blob/main/packages/cra-template/template/README.md).
