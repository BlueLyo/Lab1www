let Ventas = require('../models/venta');
let Productos = require('../models/producto');

module.exports = {        
        Query: {     
           buscarVenta(obj, {id}){               
                var venta = Ventas.find( v => v.idVenta == id);
                return venta;
            },
            calculoTotal(obj,{id}){
                var total=0;
                var venta = Ventas.find(d => d.idVenta ==id);
                const detalles = venta.detalleVenta;
                detalles.forEach(function(d){                    
                    const producto =Productos.find(p => p.idProducto == d.idProducto);
                    total+=producto.valor * d.cantidad;
                });
                venta.total=total;
                return total;
            },
            buscarDetalle(obj,{id}){
                var venta = Ventas.find(d => d.idVenta ==id);
                return venta.detalleVenta;
            }

        },
        Mutation:{
            addVenta(obj, {input}){                
                const idVenta = String(Ventas.length+1);                
                const venta = {idVenta, ...input};
                Ventas.push(venta);
                return venta;
            },
            updVenta( obj,{id, input:{fechaVenta,total,detalleVenta}} ) {
                var venta = Ventas.find(v => v.idVenta == id);    
                venta.fechaVenta =fechaVenta!=undefined?fechaVenta:venta.fechaVenta;
                venta.total = total!=undefined?total:venta.total;
                venta.detalleVenta = Array.isArray(detalleVenta)?detalleVenta:venta.detalleVenta;                                         
                return venta;
            },
            delVenta(obj,{id}) {         
                var ventaEliminada =Ventas.find( v => v.idVenta == id);
                Ventas = Ventas.filter(v => v.idVenta != id );                                  
                return ventaEliminada;
            }
        }        
    } ;