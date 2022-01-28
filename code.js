// const top_books = await Interactions.aggregate([
        //   {
        //     $lookup: {
        //       from: 'books',
        //       localField: 'bookId',
        //       foreignField: '_id',
        //       as: 'books'
        //     }
        //   },
        //   {
        //     $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$books", 0 ] }, "$$ROOT" ] } },
        //  },

        //  { 
        //  $project: {  
        //     bookId: 1,
        //     title: 1,
        //     story: 1,
        //     published: 1,
        //     username: 1,
        //     reads: 1,
        //     likes: 1,
        //     likeCount: { $size: "$likes" },
        //     readCount: { $size: "$reads" },
        //     numberOfInteractions: { $sum :[{ $size: "$reads" },{ $size: "$likes" }]}
        //    } 
        //   }
        //  ]).sort({ numberOfInteractions: -1 })
        // return top_books;



        // const books = Books.find();
                // const top_books = books.map(book => {
                //   const interaction = interactions.find(interaction => interaction.bookId.toString() === book._id.toString());
                //   if(interaction){
                //     return {
                //       ...book._doc,
                //       likeCount: interaction.likeCount,
                //       readCount: interaction.readCount,
                //       numberOfInteractions: interaction.likeCount + interaction.readCount
                //     }
                //   } 
                //   })



                // async topBooks() {
                //         try {
                //           const endpoint = 'https://serviceapis.herokuapp.com/graphql'
                //           const graphQLClient = new GraphQLClient(endpoint)
                //           const interaction_query = gql`
                //           query{
                //             getInteractions{
                //               bookId
                //               likeCount
                //               readCount  
                //             }
                //           }
                //           `
                //           const interaction_data = await graphQLClient.rawRequest(interaction_query)
                //               .then(data => {
                //                 if(data.status === 200){
                //                   const interactions = data.data.getInteractions;
                //                   // console.log(interactions);
                //                   //compare interactions with books bookId and return all data
                //                   const books_query = gql`
                //                   query{
                //                    getInteractions{
                //                      bookId
                //                      likeCount
                //                      readCount  
                //                     }
                //                   }
                //                   ` 
                //                   const books_data = graphQLClient.rawRequest(interaction_query)
                //                       .then(data => { 
                //                         if(data.status === 200){
                //                         const books_data = data.data.getInteractions;
                //                         // console.log(books_data);
                //                         // Add interaction data and book data where bookId matches
                //                         const top_books = books_data.map(book => {
                //                           const interaction = interactions.find(interaction => "" + interaction.bookId === "" + book.bookId);
                //                           if(interaction){
                //                             return {
                //                               likeCount: interaction.likeCount,
                //                               readCount: interaction.readCount,
                //                               numberOfInteractions: interaction.likeCount + interaction.readCount
                //                             }
                //                           }
                //                         })
                //                           // console.log(top_books);
                //                         // return top_books;
                //                         const top_bookss = Books.aggregate([
                //                           { 
                //                          $project: {  
                //                             bookId: 1,
                //                             title: 1,
                //                             // likeCount: top_books.likeCount,
                //                             // readCount: top_books.readCount,
                //                             // numberOfInteractions: top_books.numberOfInteractions
                //                            } 
                //                           }
                //                         ]).sort({ published: -1 })
                //                         //convert top_books data into resolver format
                //                         console.log(top_bookss);
                //                         return top_bookss;
                //                       }
                //                     })
                //                 }})    
                //         } catch (err) {
                //           throw new Error(err);
                //         }
                //       }
                //     },