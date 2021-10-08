module.exports =  `
type Producto {
    idProducto: String
    descripcion: String
    valor: Int
    stock: Int
}
input ProductoInput{
    descripcion: String
    valor: Int
    stock: Int
}
extend type Query{
    getProd(id: String): Producto
}
extend type Mutation{
    addProd(input: ProductoInput): Producto  
    updProd(id: String, input: ProductoInput): Producto
    delProd(id: String): Producto
}

`;