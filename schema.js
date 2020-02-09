const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

// Hardcoded data
// const recipes = [
//     { id: '1', name: 'Potatoes', description: 'Potato salad', author: 'Rafiki' },
//     { id: '2', name: 'Wheat', description: 'Salted bread', author: 'John' },
//     { id: '3', name: 'Potato', description: 'Salad', author: 'Roger' }
// ];

// RecipeType
const RecipeType = new GraphQLObjectType({
    name: 'Recipe',
    fields: () => ({
        id: {type:GraphQLString},
        name: {type:GraphQLString},
        description: {type:GraphQLString},
        author: {type:GraphQLString}
    })
})

// RootQuery
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        recipe: {
            type:RecipeType,
            args:{
                id:{type:GraphQLString}
            },
            resolve(parentValue, args) {
                // for(let i = 0; i < recipes.length; i++) {
                //     if(args.id == recipes[i].id) {
                //         return recipes[i];
                //     }
                // }
                return axios.get('http://localhost:3000/recipes/' + args.id).then(res => res.data)
            }
        },
        recipes: {
            type: new GraphQLList(RecipeType),
            resolve(parentValue, args) {
                return axios.get('http://localhost:3000/recipes').then(res => res.data);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
});