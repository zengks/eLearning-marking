# BCIT E-Learning Web App

## Description

This web app developed using MERN stack, and allows one instructor to view his/her students' submitted assignment questions.

## Run the System

\*Note: Current version only runs in development node environment

`docker-compose up`

## Stop the System

`docker-compose down`

## NPM Version

`v18.16.0`

## Server-Side Usage (PORT: 5000)

If not using Docker, you need to add a JWT_SECRET in .env to connect to MongoDB.

## Frontend-Side Usage (PORT: 3000)

If not using Docker, you need to edit the package.json in /frontend folder, to change "proxy" to your "localhost:5000" or other server-end of your choice.

## Mock Users

### Instructor

`Email:` doriswilson@bcit.ca
`Password:` zengks123

### Students

`Email:` margaerytyrell@bcit.ca
`Password:` zengks123

`Email:` johnsnow@bcit.ca
`Password:` zengks123

`Email:` johnsnow@bcit.ca
`Password:` zengks123
