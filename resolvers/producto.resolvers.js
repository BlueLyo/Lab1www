const producto = require('../models/producto');
let Productos = require('../models/producto');

module.exports = {        
        Query: {             
            getProd(obj, {id}){               
                var producto = Productos.find( p => p.idProducto == id);
                return producto;
            }
        },
        Mutation:{
            addProd(obj, {input}){                
                const idProducto = String(Productos.length+1);                
                const producto = {idProducto, ...input};
                Productos.push(producto);
                return producto;
            },
            updProd( obj,{id, input:{descripcion,valor,stock}} ) {
                var producto = Productos.find(p => p.idProducto == id);                 
                producto.descripcion = descripcion!=undefined?descripcion:producto.descripcion;
                producto.valor = valor!=undefined?valor:producto.valor;
                producto.stock = stock!=undefined?stock:producto.stock;                                          
                return producto;
            },
            delProd(obj,{id}) {      
                var producto = Productos.find(p => p.idProducto == id )                         
                Productos = Productos.filter(p => p.idProducto != id );                                  
                return producto; 
            }
        }        
    } ;