# Stash.It App

## Stash.IT Team

- UI team: 
- Frontend Developer: Brandon Desselle
- Backend Developer: Itel Domingo, Rory Hennessey
- Team Leader: Nick Stricken

## To utilize this app

- To view deployed app, visit: [Stash.It Home](https://stashit.netlify.com/)
- To hit endpoints of the app, target: [Stash.It Heroku](https://stashit.herokuapp.com)
- To get to the github repo of the app, target: [Github Server Repo](https://github.com/tabless-thursday-4-15-2019)

## About

- [Stash.It](https://stashit.netlify.com/) Declutters overload browser by organizing tabs into categories.
- Sign up for an account, Display user tabs, add, create & edit saved pages
- Currently: Stable Version v1.0 -- updates as of 4/15/2019

## Features

- A powerful back-end platform built with Node, Express, SQLite3, Knex, JSON Web Tokens, and Bcryptjs
- Ability to hit target endpoints to get specific data from MySQL server with saved tabs and user tables

## Technologies for this project

- [Node](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [SQLite3](https://www.sqlite.org/index.html)
- [Knex](https://knexjs.org/)
- [Bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Helmet](https://www.npmjs.com/package/morgan)

## API Endpoints

- **User Routes**

- **Saved Tabs Routes**

## To edit the source code

- Github Repo: [Stash.It Server Repo](https://github.com/tabless-thursday-4-15-2019/Backend-Itel)
1. Have stable NPM and NodeJS versions installed on your computer
2. Navigate to the directory of choice and type `https://github.com/tabless-thursday-4-15-2019/Backend-Itel.git`
3. Install necessary packages either with `yarn install` or `yarn`
4. Run the client with `npm start` or `yarn start`, then navigate to `http://localhost:5500/` to see the client
5. Open the codebase with your favorite editor and start hacking!

## Endpoints

### Users overview
|Method|Endpoint|Action   |Front-end Request|Backend Response    |
|------|--------|---------|-----------------|--------------------|
|POST| '/register'  |Signup |{username:String, password:String, phone:String, email:String} |{expiresIn:num(min), token:String, username: String, userId: String}|
POST| '/login'  |Signin|{username:String, password: String}|{expiresIn:num(min), token:String, username: String, userId: String}|
GET| '/tabs/:userId' |Load usertabs|userId: String |tabs: [Tab:Object]|
POST| '/tabs'  |Add new tab|Tab: {url: String, importance: !String, category: !String, creator: userId}| {updatedTabs: [Tab:Object]}
PUT| '/tabs/:tabId'  |Update tab|Tab: {tabId: String, tabUrl: String, importance: !String, category: !String, creator: userId}|{updatedTabs: [Tab: Object]}
DELETE| '/tabs/:tabId'  |Delete Tab| tabId: String |updatedTabs: [Tab:Obeject] 



