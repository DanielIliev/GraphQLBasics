const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema.js');
const port = process.env.PORT || 4000;

const app = express();

app.use('/graphql', expressGraphQL({
    schema:schema,
    graphiql: true
}));

app.get('/', (req, res) => {
    res.redirect('/graphql');
});

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});