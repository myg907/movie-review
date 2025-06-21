# CSC 450 - Movie Rating Website

Created by: Jack Piatt, Blaise Hefner, Jameson Baltzegar, Thomas Bourget and Melissa Gomez
- Lead Developer: Thomas Bourget
- Project Manager: Jack Piatt

---

## Brief Overview

- Our project is mostly powered by node.js, express, and sqlite, and it uses ES6 rather than CommonJS.

- We are on version 3 ==> v3

---

## Fresh Download / Setup Instructions

When you download our project from GitHub, you need to install node packages and initialize the database...

1. Navigate to the backend folder and run "npm run fresh" ==> This will install node packages and initialize the database.

2. After that, You can start the project in one of two ways...

- Run "npm start" or "node server.js" to start the project normally.

- Run "npm run dev" to start the project with nodemon (by running the server this way, the server will automatically restart anytime server.js is changed).

---

- Check out the scripts in package.json to see how they work if you want.

---

## Database Stuff

- The database.db file is where our data is stored.

- The initializeDatabase.js file sets up the database.

- The database.js file contains a function to open/get the database that should be imported into each file in the routes folder

---

- The database.db file is in .gitignore, so that's why you need to run initializeDatabase.js when you download the project.

- Whenever initializeDatabase.js is changed, you need to delete database.db and then rerun initializeDatabase.js...

	- You can do this by running "npm run reset-db" in the backend folder.

- If you make any changes to initializeDatabase.js, let us know about it on Slack.

---

## Server Stuff and API Stuff

- The server.js file in the backend creates the server for our application, serves the frontend folder, and defines some API routes.

- Without API routes, the frontend can't access anything from the backend.

- To allow the frontend to get stuff from the backend/database and post stuff to the backend/database, we define API routes in the server.js file.

- There's a routes folder in the backend where you can make some API functions to interact with the database. In the server.js file, you can import these functions and define API routes with them.

---

**API FUNCTIONS**

- Each file in the routes folder has a very similar structure (for both getAPI and postAPI methods). They all need to import a couple things for the database, so you can look at those files to see what they are. For the function itself, a lot of it's the same as well... You don't have to do it exactly how I've done it (as long as it works), but the way I've done it works and when I'm making a new route, I use the other files as a reference. Pretty much everything outside of the try block is the same and then the try block is where you actually try to do something. There is something you must do though... you need to make sure it's an async function so you can use the await keyword (I would watch a video to see what async and await do... basically, you use await for anything that could take some time to do, like accessing the database, which makes the asynchronous function not execute any further lines until the awaited thing is done).

- While all the API functions in the routes folder are very similar, there is a key difference between the get methods and post methods...

	---

	**GET METHODS**

	- The get methods are used for getting data from the database.

	- When it comes to getting data with the get API routes, I would look at browse-movies-tab.js and search-tab.js to see what's similar.

	- On the frontend side. It's always going to be in an async function and the part that actually gets the data is a group of three lines (look at the first three lines of the try block in files I mentioned). It uses the fetch function.

	- On the backend side, look at at any of the "get" files in the routes folder. Once again, basically everything that's different is in the try block, but even the try block is similar... it's a matter of making an SQL query and returning the data. I would look up what the db methods for sqlite do (literally just ask chatGPT what are the db methods for sqlite). If you decide to use db.prepare, make sure you finalize it like it's done in getMovieByTitleAPI.js and getMovieByIdAPI.js. That's pretty much it, just keep in mind that whatever you return from your API function in the routes folder is what you're going to fetch somewhere in the frontend. If you want a single object, you can use db.get in your API function. If you want an array of objects, you can use db.all in the API function.

	---

	**POST METHODS**

	- The post methods are used for creating data in the database.

	- When it comes to posting data with the post API routes, I would look at login-screen.html, login-screen.js, and postLoginAPI.js to see what's happening.

	1. The form in login-screen.html has inputs for an email and a password.

	2. In the frontend, login-screen.js set up an event listener for whenever the form is submitted. When that happens, it needs to send the form data through a route (/api/login), which will call a function (postLoginAPI) to handle it. This is done with a fetch, in which the route (/api/login) and data to be sent (email and password) are defined.

	3. In the backend, the data you sent from the form (email and password) are retrieved in the API function (postLoginAPI) by using req.body.email and req.body.password. This function can do whatever it needs to do with that data and then it will return a response, which is the thing that's fetched in the frontend (login-screen.js).

	4. Back in the frontend, the response can be used for whatever, in this example, it returns a json object with a token.

	---

**STATUS CODES**

In both get and post requests, a response is returned. You should put a status code in these responses.

- A status code in the 200s signals that everything is good.
- A status code in the 400s signals that you did something wrong (wrong password, etc.)
- A status code in the 500s signals that something went wrong on the server side (can't connect to database, etc.)

---

## Tab Stuff

- There's a tabs folder in the frontend section. Check out $ TAB TEMPLATE $ to see how to make a new tab.

---

## Architecture:
![370741440-6afd97d0-d176-4669-a2a0-5b429cc6e797](https://github.com/user-attachments/assets/bc3871d4-546e-440e-ad51-e6ee0c428b1f)
![370888914-2bd41c72-0ce1-48d7-816c-61690acd7bb5](https://github.com/user-attachments/assets/fb2d306b-05f4-47c4-b90f-6b5a9087a189)
![370884180-4fc56204-84da-4141-b2d8-8383d98a073f](https://github.com/user-attachments/assets/d16ada34-1736-42d7-800d-bf56a8ca1c87)

---
