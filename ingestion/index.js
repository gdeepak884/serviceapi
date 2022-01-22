const fs = require('fs'); 
const { GraphQLClient, gql } = require('graphql-request')
const csv = require('csv-parser');

fs.createReadStream('./data/books.csv') //Set File Path of the dataset
.pipe(csv())
.on('data', function(book){
    try {
        const endpoint = 'https://serviceapis.herokuapp.com/'
        const graphQLClient = new GraphQLClient(endpoint, {
            headers: {
             Authorization: 'Bearer <token_value>' //Set your token here
             ,
            },
            
        })
        const mutation = gql`
            mutation createBook($title: String!, $story: String!) {
                createBook(title: $title, story: $story) {
                title
                }
               }
        `
        const variables = {
            title: book.title,
            story: book.story,
        }
        const data = graphQLClient.request(mutation, variables)
            .then(data => {
            console.log('\x1b[36m%s\x1b[0m',"Book title "+book.title+" created");
        })
        .catch(error => {
                console.log('\x1b[31m',"Book title "+book.title+", Error: "+error.response.errors[0].message);
        })
    }catch(err) {
        console.log("Error: "+err);
    }})