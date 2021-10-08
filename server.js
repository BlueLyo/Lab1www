const {ApolloServer} = require('apollo-server');
const {makeExecutableSchema} = require("graphql-tools");
const {merge} = require("lodash");

const ventaTypeDefs = require('./types/venta.types');
const ventaResolvers = require('./resolvers/venta.resolvers');

const detalleVentaTypeDefs = require('./types/detalleVenta.types');
const detalleVentaResolvers = require('./resolvers/detalleVenta.resolvers');

const productoTypeDeft = require('./types/producto.types');
const productoResolvers = require('./resolvers/producto.resolvers');
const { mergeSchemas } = require('@graphql-tools/schema');



const typeDefs =`
    type Alert{
        message: String
    }
    type Query {
        _ : Boolean
    }
    type Mutation {
        _ : Boolean
    }
`;

const resolver = {};

const schema = makeExecutableSchema({
    typeDefs: [typeDefs,ventaTypeDefs,detalleVentaTypeDefs,productoTypeDeft],
    resolvers: merge(resolver,ventaResolvers,productoResolvers,detalleVentaResolvers)
})

const server = new ApolloServer({
    schema: schema
});

server.listen().then(({url})=>{
    console.log(`Servidor iniciado en ${url}`)
});


//cosas que faltan
//fechas las deje como stringl, graphql no detecta timestamp :C
//no se si hay que hacer menejo de stock, pero no lo hice
