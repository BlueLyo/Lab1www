module.exports =  `
type Venta {
    idVenta: String
    fechaVenta: String
    total: Int
    detalleVenta: [DetalleVenta]
}
input VentaInput{
    fechaVenta: String
    total: Int
    detalleVenta: DetalleVentaInput
}
extend type Query{
    buscarVenta(id: String): Venta
    buscarDetalle(id: String): [DetalleVenta]
    calculoTotal(id: String): Int
}
extend type Mutation{
    addVenta(input: VentaInput): Venta  
    updVenta(id: String,input: VentaInput): Venta
    delVenta(id: String): Venta
}

`;