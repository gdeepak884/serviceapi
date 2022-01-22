<h1 align="center">ServiceApis</h1>

<p align="center">
  <i>Microservices for Content & User Services</i>
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

## Tech Stack

- NodeJS
- GraphQL
- MangoDB 
- Apollo server
- JWT

## Database Schema

![Database Schema](https://raw.githubusercontent.com/gdeepak884/serviceapi/main/img/schema.png?token=GHSAT0AAAAAABO4KBTLWIVMMUU7NAFWKK6GYPVHGKQ)


## API's Postman Collections

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/2b684f9cb08eeb4b7c3a?action=collection%2Fimport)`[including doc]`


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
    _id
    title
    story
    published
    username
    likes{
      _id
      username
      likedAt
    }
    reads{
      _id
      username
      readAt
    }
    likeCount
    readCount
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
        "_id": "61e5fe971df9db7d3247ef00",
        "title": "tes",
        "story": "tess",
        "published": "2022-01-17T23:41:11.512Z",
        "username": "gdee",
        "likes": [],
        "reads": [
          {
            "_id": "61e6720d7bb28c32f6f1bf7f",
            "username": "gdee",
            "readAt": "2022-01-18T07:53:49.450Z"
          },
          {
            "_id": "61e673e20bacec92eb0b6797",
            "username": "gdeeh",
            "readAt": "2022-01-18T08:01:38.764Z"
          }
        ],
        "likeCount": 0,
        "readCount": 2
      },
      {
        "_id": "61e6a0b3bd0b9fe7800285e8",
        "title": "new book test",
        "story": "book test",
        "published": "2022-01-18T11:12:51.453Z",
        "username": "gdeeh",
        "likes": [],
        "reads": [],
        "likeCount": 0,
        "readCount": 0
      }
    ]
  }
}
```
## Quick Video

[Demo Video](https://www.youtube.com/watch?v=EbYbtmU9VnY)

## License

MIT
