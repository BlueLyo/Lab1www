module.exports =  `
type DetalleVenta {
    idVenta: String
    cantidad: Int
    idProducto: String
    idDetalle: String
}
input DetalleVentaInput{
    idVenta: String
    cantidad: Int
    idProducto: String    
}
extend type Query{
    buscarProducto(idProducto: String): DetalleVenta
}
extend type Mutation{
    addDetalle(input: DetalleVentaInput): DetalleVenta  
    updDetalle(id: String, input: DetalleVentaInput): DetalleVenta
    delDetalle(id: String): DetalleVenta
}

`;