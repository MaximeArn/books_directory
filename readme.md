**This project is based on benoitvallon json file thank's to him**

## features to integrate :

- ### First phase :
  - [x] map on the json file to display the infomation of every book
    - read into the json file
    - return data in the response body
  - [x] add a route to get a book's information :
    - get id from the params
    - return the corresponding object
  - [x] integrate a route to add a new book
    - images managment
    - parse the data
    - store the image in fs with a parsed name
  - [x] integrate a route that allow user to modify the information (writing in json file)
  - [x] allow user to delete a book from the list
- ### Second phase :
  - [x] use a database to store the informations
    - postgres to refamiliarize myself with sql
- ### Third phase :
  - implement a logger system:
    - [x] create a logger
    - [x] Implement a console transport
    - [x] Implement a fs transport
    - [x] Rotate files every X days
    - [x] create an error structure that contains all the metaData needed in the logs
    - [x] handle uncaughtExceptions and uncaughtRejections
    - [x] store logs in a centralized service
- ### Fourth phase :
  - [x] write a documentation
  - [x] host it
  - [x] GOT IT !

# How to test :

server is hosted on this url :

`https://books-directory-hosting-3428f019a6a7.herokuapp.com/`
