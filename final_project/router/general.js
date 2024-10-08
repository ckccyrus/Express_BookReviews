const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
        // Check if the user does not already exist
        if (!isValid(username)) {
            // Add the new user to the users array
            users.push({ "username": username, "password": password });
            return res.status(200).json({ message: "User successfully registered. Now you can login" });
        } else {
            return res.status(404).json({ message: "User already exists!" });
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({ message: "username &/ password are not provided" });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    //   res.send(JSON.stringify(books, null, 4));
    let myPromise = new Promise((resolve, reject) => {
        resolve(books)
    })
    myPromise.then((successBooks) => {
        res.send(JSON.stringify(successBooks, null, 4));
    })
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const book = books[isbn];

    // if (book) {
    //     res.send(book);
    // } else {
    //     res.send("Unable to find book!");
    // }
    let myPromise = new Promise((resolve, reject) => {
        resolve(book)
    })
    myPromise
        .then((successBook) => {
            if (successBook) {
                res.send(successBook);
            } else {
                res.send("Unable to find book!");
            }
        })
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    let result = null;
    Object.keys(books).forEach((key) => {
        const book = books[key]
        if (book.author === author) {
            result = book
        }
    })
    // if (result) {
    //     res.send(result);
    // } else {
    //     res.send("Unable to find book!");
    // }
    let myPromise = new Promise((resolve, reject) => {
        resolve(result)
    })
    myPromise
        .then((successBook) => {
            if (successBook) {
                res.send(successBook);
            } else {
                res.send("Unable to find book!");
            }
        })
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    let result = null;
    Object.keys(books).forEach((key) => {
        const book = books[key]
        if (book.title === title) {
            result = book
        }
    })
    // if (result) {
    //     res.send(result);
    // } else {
    //     res.send("Unable to find book!");
    // }
    let myPromise = new Promise((resolve, reject) => {
        resolve(result)
    })
    myPromise
        .then((successBook) => {
            if (successBook) {
                res.send(successBook);
            } else {
                res.send("Unable to find book!");
            }
        })
});

//  Get book re˝view
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const book = books[isbn];

    if (book) {
        res.send(book.reviews);
    } else {
        res.send("Unable to find book!");
    }
});

module.exports.general = public_users;
