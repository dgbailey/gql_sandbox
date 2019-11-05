const {GraphQLServer} = require('graphql-yoga');

//what typed api operations are accepted in my gql server: typeDefs
//graphql servers contain three special root types (query,mutation, subscription)
//here info is a root field
//typeDefs, specifies what api operations are allowed
//how  the above api operations resolved
//Each field in the application schema is represented by a function with the same name in that object.

const resolvers = {

    //every GraphQL resolver function actually receives four input arguments
    Query:{
        //root fields
        info:() => `This is my first graphql api`,
        feed:() => links
    },
    Mutation:{
        post:(parent,args) => {
            const link = {
                id:`link-${idCount++}`,
                description:args.description,
                url:args.url,
            
            }
            links.push(link);
            return link
        }

        
    }
    // Link:{
    //     //regular fields
    //      graphql infers what these look like
    //     id: (parent) => parent.id,
    //     description: (parent) => parent.description,
    //     url: (parent) => parent.url
    // }

}

//this info is bundled and passed to the server
//graphql-js reference implementation ensures that the return types of your resolvers adhere to the type definitions from your GraphQL schema
const server = new GraphQLServer({
    typeDefs:'./schema.graphql',    
    resolvers
});

server.start(() => console.log(`Server is running on http://localhost:4000`));

//when querying an object type, it is required that you query at least one of its fields in a selection set.