<h1>QuickChat</h1>

<a href="https://radiant-ganache-5a0f50.netlify.app/">Live Demo</a>

<h2>Features</h2>
<ul>
  <li>Real-time messaging with friends</li>
  <li>Login and Signup functionality</li>
</ul>

<h2>Getting Started</h2>
<p>These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.</p>

<h3>Prerequisites</h3>
<ul>
  <li>Node.js and npm (latest versions recommended)</li>
  <li>MongoDB (local or cloud-based)</li>
  <li>Socket.io</li>
</ul>

<h3>Installation</h3>
<ol>
  <li>Clone or download the repository</li>
  <li>Set up a .env file in the root directory with the following variables:
    <ul>
      <li>DATABASE_URI: your MongoDB connection string</li>
      <li>DATABASE_PASSWORD: your MongoDB password</li>
      <li>JWT_SECRET: a secret string for encrypting sessions</li>
      <li>JWT_EXPIRES_IN: expiration time for JWT tokens</li>
    </ul>
  </li>
  <li>Open "server" folder and run npm install and npm start to install all project dependencies and start the server on localhost:3000</li>
  <li>Open "client" folder and run npm install and npm start to install all project dependencies and start the front-end on localhost:3000</li>
</ol>

<h3>Built With</h3>
<ul>
  <li>React - JavaScript library for building user interfaces</li>
  <li>Node.js - JavaScript runtime for building server-side applications</li>
  <li>Express - Web application framework for Node.js</li>
  <li>MongoDB - NoSQL database for storing user data</li>
  <li>Socket.io - Real-time engine for communication</li>
  <li>TailWind css</li>
</ul>

<h3>Authors</h3>
<ul>
  <li>yoni2528(https://github.com/yoni2528) - Initial development and maintenance</li>
</ul>

<h3>Future Development</h3>
<ul>
  <li>Add the ability to send images and files</li>
  <li>Add the ability to create and join groups</li>
  <li>Add the ability to see whos online and whos not</li>
  <li>Add the ability to make video and audio calls</li>
</ul>
