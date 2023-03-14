# Angel Tech Helpdesk MERN Project <!-- omit in toc -->

## Table of Contents <!-- omit in toc -->

- [Description](#description)
- [Technologies](#technologies)
- [Linked Repositories](#linked-repositories)
- [Packages](#packages)
- [Roadmap](#roadmap)
- [Demo](#demo)
- [Screenshots](#screenshots)

## Description

A helpdesk application that allows users to login to an account, create tickets for technical issues, update tickets and admin users can create, delete and manage other user accounts. Client-side created using React. Server-side created using MongoDB for databse, Express.js and Node.js for API.

## Technologies

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![JSON Web Token](https://img.shields.io/badge/json%20web%20tokens-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)

## Linked Repositories

- Frontend:
  [AngelTech Frontend](https://github.com/HaylzRandom/angeltech-frontend)
- Backend: [AngelTech API](https://github.com/HaylzRandom/angeltech-api)

## Packages

<table>
    <tr><th>Name</th><th>Description</th></tr>
    <tr><td>bcrypt</td><td>A package library that us used to help has passwords.</td></tr>
    <tr><td>cookie-parser</td><td>Middleware used to parse cookies that are attached to a request made by the client to the server.</td></tr>
    <tr><td>cors</td><td>Middleware used to allow requests from specific origins as stated by the application.</td></tr>
    <tr><td>date-fns</td><td>Package used to manipulate dates into different formats.</td></tr>
    <tr><td>dotenv</td><td>Used to load API keys and MongoDB connection string from .env file.</td></tr>
    <tr><td>express</td><td>Web framework used to help create API.</td></tr>
    <tr><td>express-async-errors</td><td>Used to catch errors at runtime without excessive use of try/catch blocks in async functions.</td></tr>
    <tr><td>express-rate-limit</td><td>Rate-limiting middleware for express. Used to limit repeated requests to API endpoints and in the current project related to login attempts.</td></tr>
    <tr><td>jsonwebtoken</td><td>Package implementation of JSON Web Token (JWT). Used to maintain login state of an account.</td></tr>
    <tr><td>mongoose</td><td>Package that provides a straight-forward, schema based solution to model application data for MongoDB. In this application is is used to connect to MongoDB instance and creating the models for Tickets and Users.</td></tr>
    <tr><td>mongoose-sequence</td><td>Package to create fields in a Mongoose model that will autoincrement the value (e.g ID for a User or for a Ticket).</td></tr>
    <tr><td>uuid</td><td>Package to create a random UUID.</td></tr>
</table>


## Roadmap

- [ ] When deleting a user, checked if there are any open tickets attached to
      them
- [ ] When creating a customer user, add a company to their account
- [ ] Research if a cleaner method for pre-populating customer exists when
      creating ticket
- [ ] Set last logged in date and time on user dashboard
- [ ] Create a custom loading spinner
- [ ] Redesign website layout with new styles
- [ ] Add a note system to tickets
- [ ] Allow users to alter their own passwords (Only Admins and Managers can
      alter passwords)
- [ ] When tickets are updated, send an e-mail out
- [ ] Implement TypeScript when more comfortable with it

## Demo

[Demo Website](https://angeltech-helpdesk.onrender.com/)

Demo Gif

<img src="https://github.com/HaylzRandom/angeltech-frontend/raw/main/screenshots/demo.gif.gif" alt="Demo Gif" width="800"  />

## Screenshots

<p align="center"> 
    <table>
        <thead>General</thead>
        <tr>
            <td>
                <img src="https://github.com/HaylzRandom/angeltech-frontend/raw/main/screenshots/desktop-homepage.png" alt="Homepage Screenshot" width="300" height="100%" />
            </td>
            <td>
                <img src="https://github.com/HaylzRandom/angeltech-frontend/raw/main/screenshots/desktop-login.png" alt="Login Page Screenshot" width="300" height="100%" />
            </td>
        </tr>
    </table>
</p>

<p align="center"> 
    <table>
        <thead>Admin Pages</thead>
        <tr>
            <td>
                <img src="https://github.com/HaylzRandom/angeltech-frontend/raw/main/screenshots/admin-dashboard.png" alt="Admin Dashboard Screenshot" width="300" height="100%" />
            </td>
            <td>
                <img src="https://github.com/HaylzRandom/angeltech-frontend/raw/main/screenshots/users-list.png" alt="Users List Screenshot" width="300" height="100%" />
            </td>
        </tr>
        <tr>
            <td>
                <img src="https://github.com/HaylzRandom/angeltech-frontend/raw/main/screenshots/new-user.png" alt="New User Creation Screenshot" width="300" height="100%" />
            </td>
        </tr>
    </table>
</p>

<p align="center"> 
    <table>
        <thead>Customer Pages</thead>
        <tr>
            <td>
                <img src="https://github.com/HaylzRandom/angeltech-frontend/raw/main/screenshots/customer-tickets.png" alt="Customer Tickets Page Screenshot" width="300" height="100%" />
            </td>
            <td>
                <img src="https://github.com/HaylzRandom/angeltech-frontend/raw/main/screenshots/ticket-creation.png" alt="Creation of a Ticket Screenshot" width="300" height="100%" />
            </td>
        </tr>
    </table>
</p>
