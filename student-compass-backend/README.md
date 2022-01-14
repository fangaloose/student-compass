# student-compass-backend

## Introduction

Project made using the MERN stack in Fall 2021 as part of a Web development course. This is the backend repository    

## Setup instructions

Create an .env file in the root of the project with the following variables:

- mongoUrl
  - mongoDB connection string
- tokenKey
  - string or buffer containing either the secret for HMAC algorithms, or the PEM encoded public key for RSA and ECDSA. used for verifying the json web token
- email
  - email to use with nodemailer for sending mails. we used a gmail account
- password
  - email's password to use with nodemailer

## How to run the project

`npm start` will run the project on port 4000 by default



## The Team

Georges Farah

Michel El Hajal
