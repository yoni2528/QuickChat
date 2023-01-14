# QuickChat

## [Live Demo](https://radiant-ganache-5a0f50.netlify.app/)

## Features
- Real-time messaging with friends
- Login and Signup functionality

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
- Node.js and npm (latest versions recommended)
- MongoDB (local or cloud-based)
- Socket.io

### Installation
1. Clone or download the repository
2. Set up a .env file in the root directory with the following variables:
    - MONGO_URL: your MongoDB connection string
    - MONGO_PASS: your MongoDB password
    - JWT_SECRET: a secret string for encrypting sessions
3. Open "server" folder and run npm install and npm start to install all project dependencies and start the server on localhost:3000
4. Open "client" folder and run npm install and npm start to install all project dependencies and start the front-end on localhost:3000

### Built With
- React - JavaScript library for building user interfaces
- Node.js - JavaScript runtime for building server-side applications
- Express - Web application framework for Node.js
- MongoDB - NoSQL database for storing user data
- Socket.io - Real-time engine for communication
- TailWind css

### Authors
- [yoni2528](https://github.com/yoni2528) - Initial development and maintenance

### Future Development
- Add the ability to send images and files
- Add the ability to create and join groups
- Add the ability to make video and audio calls
