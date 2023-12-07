**This project is based on benoitvallon json file thank's to him**

## features to integrate :

- ### First phase :
  - map on the json file to display the infomation of every book
    - read into the json file
    - return data in the response body
  - add a route to get a book's information :
    - get id from the params
    - return the corresponding object
  - integrate a route to add a new book
    - images managment
    - parse the data
    - store the image in fs with a parsed name
  - integrate a route that allow user to modify the information (writing in json file)
  - allow user to delete a book from the list
- ### Second phase :
  - use a database to store the informations
    - postgres to refamiliarize myself with sql
  - write a documentation and host it
