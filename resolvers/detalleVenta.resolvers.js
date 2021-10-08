let Ventas = require('../models/venta');
let Productos = require('../models/producto');
let DetalleVentas = require('../models/detalleVenta');

module.exports = {        
        Query: {                 
            buscarProducto(obj, {idProducto}){                                                
                var detalle = DetalleVentas.find( d => d.idProducto == idProducto);                
                return detalle;
            }
        },
        Mutation:{
            addDetalle(obj, {input}){                
                const idDetalle = String(DetalleVentas.length+1);                
                var detalle = {idDetalle, ...input};
                var venta=Ventas.find(v => v.idVenta==input.idVenta);
                if(venta.detalleVenta==undefined)
                    venta.detalleVenta=[];
                venta.detalleVenta.push(detalle);
                DetalleVentas.push(detalle);
                return detalle;
            },
            updDetalle( obj,{id, input:{idVenta,idProducto,cantidad}} ) {
                var detalle = DetalleVentas.find(d => d.idDetalle == id);
                
                //si el id venta cambia hay que editar el detalle en las ventas
                if(idVenta==undefined || idVenta==detalle.idVenta){
                    //el idVenta no cambia, solo cambiar campos en detalleVenta
                    var venta=Ventas.find(v => v.idVenta==detalle.idVenta);                    
                    detalle.idProducto= idProducto!=undefined?idProducto:detalle.idProducto;
                    detalle.cantidad = cantidad!=undefined?cantidad:detalle.cantidad;
                }
                else {
                    //el idVenta cambia, quitar detalle de venta y agregar en otra venta
                    var idVentaPrevio = detalle.idVenta;

                    //cambiar campos de detalle venta
                    detalle.idVenta=idVenta;
                    detalle.idProducto= idProducto!=undefined?idProducto:detalle.idProducto;
                    detalle.cantidad = cantidad!=undefined?cantidad:detalle.cantidad;

                    //borrar detalle venta de la venta antigua
                    var venta=Ventas.find(v => v.idVenta==idVentaPrevio);
                    venta.detalleVenta = venta.detalleVenta.filter(d => d.idDetalle != id);

                    //asiganr detalle venta a la venta nueva
                    var venta=Ventas.find(v => v.idVenta==idVenta);
                    if(venta.detalleVenta==undefined)
                        venta.detalleVenta=[];
                    venta.detalleVenta.push(detalle);
                }                                        
                return detalle;
            },
            delDetalle(obj,{id}) {   
                elementoAEliminar=DetalleVentas.find(d => d.idDetalle == id );
                //eliminar en venta
                var venta =Ventas.find(v => v.idVenta == elementoAEliminar.idVenta);
                venta.detalleVenta = venta.detalleVenta.filter(d => d.idDetalle != id);

                //elimnar en detalle venta                
                DetalleVentas = DetalleVentas.filter(d => d.idDetalle != id );                                  
                        
                return elementoEliminado;  
            }
        }        
    } ;