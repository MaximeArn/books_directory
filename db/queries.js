const { Pool } = require("pg");
const dbSettings = require("./dbConfig");

const books = require("../books.json");

const pool = new Pool(dbSettings);

const getBooks = async (req, res, next) => {
  try {
    const { rows: books } = await pool.query(
      "SELECT * FROM books ORDER BY id ASC"
    );
    res.send(books);
  } catch (error) {
    next(error);
  }
};

const getBookById = async ({ params: { id } }, res, next) => {
  try {
    const { rows: book } = await pool.query(
      "SELECT * FROM books WHERE id=$1 ORDER BY id ASC",
      [id]
    );
    res.send(book);
  } catch (error) {
    next(error);
  }
};

const createUser = async ({ body, file: { path } }, res, next) => {
  body.imageLink = path;
  body.pages = Number.parseInt(body.pages);
  body.year = Number.parseInt(body.year);

  try {
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
    next(error);
  }
};

const deleteUser = async ({ params: { id } }, res) => {
  try {
    pool.query("DELETE from books WHERE id = $1", [id]);
    res.send(`User with id : ${id} has been deleted`);
  } catch (error) {
    next(error);
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
    next(error);
  }
};

const updateUser = async ({ body, params, file }, res, next) => {
  try {
    filteredBody = Object.fromEntries(
      Object.entries(body).filter(([key, value]) => value !== "")
    );
    if (Object.keys(filteredBody) === 0)
      res.send("cannot update book with empty values");

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
      [...Object.values(filteredBody), params.id]
    );

    res.json(updatedBook);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBooks,
  getBookById,
  createUser,
  deleteUser,
  feedDatabase,
  updateUser,
};
