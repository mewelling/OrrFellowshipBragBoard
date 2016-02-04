# OrrFellowshipBragBoard
An AngularJS and NodeJS project to display google spreadsheets information in a changing grid.

## API
### localAPI.js  
API running locally at localhost:3001/brags that reads from a google spreadsheet and returns a JSON list with `length`, `width`, and `color` are randomized. It only pulls brags from within the last month.
  ```json
    [{
        "length":3,
        "width":3,
        "color":"orr4",
        "message":"This is the first test of the new brag board!"
    }]
  ```
### lambda.js  
API designed to run on AWS Lambda with the same functionality of `localAPI.js`
    

## Web
Angular web app that displays the data from the NodeJS API. It shuffles the grid every 10 seconds and reloads from the server every minute.
![BragBoard Screenshot1](/Web/images/Screenshot1.png?raw=true)


