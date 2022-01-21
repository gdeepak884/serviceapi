const fs = require('fs'); 
const { GraphQLClient, gql } = require('graphql-request')
const csv = require('csv-parser');


fs.createReadStream('./data/books.csv')
.pipe(csv())
.on('data', function(book){
    try {
        const endpoint = 'https://serviceapis.herokuapp.com/'
        const graphQLClient = new GraphQLClient(endpoint, {
            headers: {
             Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZWIxNWQ3Yjk5MDFhNjRkYmI1ZjM1ZiIsImVtYWlsIjoiZ2RlZXBhazg4NEBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2NDI4MDAyNzcsImV4cCI6MTY0MjgwMzg3N30.MncX0uPIlgvIsJ-ojiPpdOI0NJvH0liqdz-pPf9fqLQ',
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
            console.log("Book title "+book.title+" created");
    }
    catch(err) {
        console.log(err)
    }
})
.on('end',function(){
    console.log('Data Ingestion Completed ✅')
});