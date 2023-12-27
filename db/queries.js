const { Pool } = require("pg");
const dbSettings = require("./dbConfig");

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

module.exports = {
  getBooks,
  getBookById,
  createUser,
  deleteUser,
};
