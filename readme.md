# **Documentation**

## **Overview** :

This Api is build around a json data file containing the 100 best books in the world (thanks to benoitvallon). It was just a fun way for me to integrate all the crud operation to build a REST api.

_This project is only a way to train myself and was not though to be used by people._

although it is not possible to use this API for your project (because all requests are sent to the same database) It is possible to test the routes listed below.

## How to test :

server is hosted on this url :

`https://books-repository-api.onrender.com`

## **Routes** :

### _GET :_

#### getBooks :

`"/" : return an array containing the whole list of books `

#### getBookById :

`"/book/:id" : return an object if a book with the id passed through the params of the request was found `

### _POST :_

#### _createBook_ :

`"/" :  Store the image in the file system if there is one and use the data from the body of the request to create a new book. This route return the new book if no error occurs`

**body type expected :**

```js
req.body : {
  author: string, //required
  country: string, //required
  language: string, //required
  link: string, //required
  pages: string || number , //required
  title: string, //required
  year: string || number, //required
  image: file // optional
  // if not specified the image will be a default one
}
```

#### _feedDatabase_:

`"/feedDb" : map on the json file (that is an array of objects) and create a new book for every object. `

### _PATCH :_

#### _updateBook_ :

`"/book/:id" : `

**body type expected :**

```js
req.body : {
  author: string, //optional
  country: string, //optional
  language: string, //optional
  link: string, //optional
  pages: string || number , //optional
  title: string, //required if image is provided
  // multer uses the title of the book to store the image. If image is provided title must be provided too
  year: string || number, //optional
  image: file // optional
}
```

### _DELETE :_

#### _deleteBook_ :

`"/book/:id" : delete the book with the specified Id `
