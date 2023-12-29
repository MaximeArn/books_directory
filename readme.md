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
  - implement a logger like winston
- ### Fourth phase :
  - - write a documentation and host it
