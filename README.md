<h1 align="center">ServiceApis</h1>

<p align="center">
  <i>Microservices for Content, User & User Interaction</i> Services</i>
  <br>
</p>

<p align="center">
  <a href="https://serviceapis.herokuapp.com/"><strong>serviceapis.herokuapp.com</strong></a>
  <br>
</p>

<p align="center">
    <img src="https://img.shields.io/badge/npm-v8.1.0-blue?logo=npm"/>
     &nbsp;
    <img src="https://img.shields.io/badge/docker-compose-blue?logo=docker"/>
     &nbsp;
    <img src="https://img.shields.io/badge/graphql-v15.8.0-red?logo=graphql&logoColor=red&label=graphql" />
     &nbsp;
    <img src="https://img.shields.io/badge/heroku-deployed-blue?logo=heroku"/>
</p>

<hr>

## Documentation

![APIs](https://raw.githubusercontent.com/gdeepak884/serviceapi/main/img/apis.png?token=GHSAT0AAAAAABO4KBTKXAG76J3CTD74ICAGYPV3CJQ)

### User Services

1. getUser(): Get users details

2. signup(): Signup new user
   - Requires: fname, lname, username, password, confirmPassword, email, phone 
   - Validation: Unique username
   - Returns: token, user details

3. signin(): Signin existing user
    - Requires: username, password
    - Validation: User should exist
    - Returns: token, user details

4. deleteUser(): Delete user
    - Requires: userId
    - Headers: Authorization: Bearer 'token_value'
    - Validation: User should exist
    - Extra: Delete User likes and reads from interactions collection

5. updateProfile(): Update user profile
    - Requires: userId, fname, lname, email, phone
    - Headers: Authorization: Bearer 'token_value'
    - Validation: User should exist

### Content Services

1. newBooks(): Get all books sorted by date

2. topBooks(): Get top books sorted on the basis of number of interactions, likes and reads.

3. createBook(): Create new book
    - Requires: title, story
    - Headers: Authorization: Bearer 'token_value'
    - Validation: Unique title

4. updateBook(): Update book
    - Requires: bookId, title, story
    - Headers: Authorization: Bearer 'token_value'
    - Validation: Book should exist
         
5. deleteBook(): Delete book
    - Requires: bookId
    - Headers: Authorization: Bearer 'token_value'
    - Validation: Book should exist
    - Extra: Delete interactions for this book

### User Interaction Services

1. getInteractions(): Get all interactions

2. readBook(): Mark book as read
    - Requires: bookId
    - Headers: Authorization: Bearer 'token_value'
    - Validation: Book should exist, user should exist

3. likeBook(): Mark book as liked
    - Requires: bookId
    - Headers: Authorization: Bearer 'token_value'
    - Validation: Book should exist, user should exist


## Tech Stack

- NodeJS
- GraphQL
- MangoDB 
- Apollo server
- JWT

## Architecture Design

![Architecture Design](https://raw.githubusercontent.com/gdeepak884/serviceapi/main/img/architecture.png?token=GHSAT0AAAAAABO4KBTLNDC2HUVCQXSHBLNUYPV3CKQ)
## Database Schema

![Database Schema](https://raw.githubusercontent.com/gdeepak884/serviceapi/main/img/schema.png?token=GHSAT0AAAAAABO4KBTLWIVMMUU7NAFWKK6GYPVHGKQ)


## API's Postman Collections

[Postman Documentation](https://documenter.getpostman.com/view/13401788/UVXqDsY5)

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/2b684f9cb08eeb4b7c3a?action=collection%2Fimport)


## Getting setup

#### Method - 1:  Docker Compose Setup

#### Prerequisites

- Install [Docker](https://www.docker.com/)

Download the project

```
$ git clone https://github.com/gdeepak884/serviceapi.git
```

To start the server

```
$ cd serviceapi
$ docker compose up
```

to play with APIs, navigate to the below address in
your preferred browser.

`127.0.0.1:80/graphql`

To stop the server

```
$ docker compose down
```

<hr>

#### Method - 2:  Node Server Setup

#### Prerequisites

- Install [Node.js](https://nodejs.org/en/)

Download the project

```
$ git clone https://github.com/gdeepak884/serviceapi.git
```

To start the server

```
$ cd serviceapi
$ npm install
$ npm run dev/prod
```
* dev for development mode
* prod for production mode

to play with APIs, navigate to the below address in
your preferred browser.

`127.0.0.1:80/graphql`

## Data Ingestion

- Set Dataset File Path in the `ingestion/index.js` 
- Set Token value of any user in `ingestion/index.js`, then

> Note: In the dataset please take care that the title values should need to be unique or for the testing purpose, i have attached a CSV dataset of unique title in `/data` dir.
```
$ npm run ingestion
```
or

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/a9e3524fb76919145520?action=collection%2Fimport)`[including doc]`

## Sample Query

Request:

```graphql

query{
  topBooks{
    bookId
    title
    story
    username
    published
    likeCount
    readCount
    likes{
      _id
      likedAt
      username
    }
    reads{
      _id
      readAt
      username
    }
    numberOfInteractions
  }
}

```

In this query, we are trying to reach all books with all details from our books’ schema. The result of this query would be like, for example:

Response:

```json

{
  "data": {
    "topBooks": [
      {
        "bookId": "61f2969c92057ecdfd56d77f",
        "title": "testing1",
        "story": "testing",
        "username": "new9",
        "published": "2022-01-27T12:57:00.700Z",
        "likeCount": 1,
        "readCount": 1,
        "likes": [
          {
            "_id": "61f296d73eb1cc7571aaf003",
            "likedAt": "2022-01-27T12:57:59.905Z",
            "username": "new9"
          }
        ],
        "reads": [
          {
            "_id": "61f296e33eb1cc7571aaf008",
            "readAt": "2022-01-27T12:58:11.084Z",
            "username": "new9"
          }
        ],
        "numberOfInteractions": 2
      },
      {
        "bookId": "61f2ad86800745680ec0020c",
        "title": "testing122",
        "story": "testing",
        "username": "new12",
        "published": "2022-01-27T14:34:46.725Z",
        "likeCount": 1,
        "readCount": 1,
        "likes": [
          {
            "_id": "61f2af541330c071df7a8ebb",
            "likedAt": "2022-01-27T14:42:28.632Z",
            "username": "new12"
          }
        ],
        "reads": [
          {
            "_id": "61f2adb9800745680ec00218",
            "readAt": "2022-01-27T14:35:37.796Z",
            "username": "new12"
          }
        ],
        "numberOfInteractions": 2
      },
      {
        "bookId": "61f2969792057ecdfd56d77a",
        "title": "testing",
        "story": "testing",
        "username": "new9",
        "published": "2022-01-27T12:56:55.880Z",
        "likeCount": 1,
        "readCount": 0,
        "likes": [
          {
            "_id": "61f296f23eb1cc7571aaf010",
            "likedAt": "2022-01-27T12:58:26.746Z",
            "username": "new9"
          }
        ],
        "reads": [],
        "numberOfInteractions": 1
      },
      {
        "bookId": "61f2ad7e800745680ec001fd",
        "title": "testing111",
        "story": "testing",
        "username": "new12",
        "published": "2022-01-27T14:34:38.860Z",
        "likeCount": 0,
        "readCount": 0,
        "likes": [],
        "reads": [],
        "numberOfInteractions": 0
      }
    ]
  }
}
```
## Quick Video

[Demo Video](https://www.youtube.com/watch?v=EbYbtmU9VnY)

## License

MIT
