# GoogleFootprint
A carbon footprint calculator based on your google search.

To run this code you need to install following node modules :
* Express
* Sqlite3
* Cors

For this code to run, path of the chrome history file needs to be modified according to the user. 
Open app.js and change the path in sqlite3.Database('path') and also in fs.copyFileSync('path').
