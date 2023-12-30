const { Pool } = require("pg");
const dbSettings = require("./dbConfig");
const { logger } = require("../errors/logger");
const CustomError = require("../errors/customError");

const books = require("../books.json");

const pool = new Pool(dbSettings);

const getBooks = async (req, res, next) => {
  try {
    const { rows: books } = await pool.query(
      "SELECT * FROM books ORDER BY id ASC"
    );
    res.send(books);
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

const getBookById = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
    const { rowCount, rows: book } = await pool.query(
      "SELECT * FROM books WHERE id=$1 ORDER BY id ASC",
      [id]
    );
    if (rowCount === 0) {
      throw new CustomError(
        `Le livre avec l'id ${id} n'a pas été trouvé.`,
        404
      );
    } else {
      res.send(book);
    }
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

const createBook = async ({ body, file }, res, next) => {
  try {
    body.imageLink = file ? file.path : "default.png";
    body.pages = Number.parseInt(body.pages);
    body.year = Number.parseInt(body.year);

    const {
      rows: [insertedBook],
    } = await pool.query(
      "INSERT INTO books (author,country,imageLink,language,link,pages,title,year) values ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
      [
        body.author,
        body.country,
        body.imageLink,
        body.language,
        body.link,
        body.pages,
        body.title,
        body.year,
      ]
    );
    res.json(insertedBook);
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

const deleteBook = async ({ params: { id } }, res, next) => {
  try {
    const { rowCount } = await pool.query("DELETE from books WHERE id = $1", [
      id,
    ]);
    if (rowCount === 0) {
      throw new CustomError(
        `Le livre avec l'id ${id} n'a pas été trouvé.`,
        404
      );
    } else {
      res.send(`User with id : ${id} has been deleted`);
    }
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

const feedDatabase = async (req, res, next) => {
  try {
    books.map((book) => {
      pool.query(
        "INSERT INTO books (author,country,imageLink,language,link,pages,title,year) values ($1,$2,$3,$4,$5,$6,$7,$8)",
        [
          book.author,
          book.country,
          book.imageLink,
          book.language,
          book.link,
          book.pages,
          book.title,
          book.year,
        ]
      );
    });
    res.send("database was fed");
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

const updateBook = async ({ body, params: { id }, file }, res, next) => {
  try {
    filteredBody = Object.fromEntries(
      Object.entries(body).filter(([key, value]) => value !== "")
    );

    if (Object.keys(filteredBody).length === 0)
      throw new CustomError("cannot update book with empty values", 500);

    if (file) {
      filteredBody.imageLink = file.path;
      //TODO: remove the previous version of the image: maybe by storing it's path in the db
    }

    const setClause = Object.entries(filteredBody)
      .map(([key, value], index) => `${key} = $${index + 1}`)
      .join(", ");

    const {
      rows: [updatedBook],
    } = await pool.query(
      `UPDATE books SET ${setClause}  WHERE id = $${
        Object.keys(filteredBody).length + 1
      } RETURNING *`,
      [...Object.values(filteredBody), id]
    );
    if (!updatedBook)
      throw new CustomError(
        `Le livre avec l'id ${id} n'a pas été trouvé.`,
        404
      );
    res.json(updatedBook);
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

module.exports = {
  getBooks,
  getBookById,
  createBook,
  deleteBook,
  feedDatabase,
  updateBook,
};
