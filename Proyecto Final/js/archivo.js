/* clase Producto */
class Producto
{
    constructor(rutaImg,titulo,marca,color,precio,talle)
    {
        this.rutaImg = rutaImg; //para luego poder cargar la imágen del producto
        this.titulo = titulo;
        this.marca = marca;
        this.color = color;
        this.precio = precio;
        this.talle = talle;
        this.descripcion = "";
        this.cantDisponible = 0;
    }

    setCantidad(cantDisponible)
    {
        this.cantDisponible = cantDisponible;
    }

    setDescripcion(descripcion)
    {
        this.descripcion = descripcion;
    }
}

/* clase Carrito */
class Carrito
{
    constructor()
    {
        this.productosCarrito = [];
    }

    agregarProducto(productoCompra)
    {
        if(productoCompra.cantDisponible > 0)
        {    
            this.productosCarrito.push(productoCompra);
            productoCompra.cantDisponible--;//modificar-----------------------------
        }
        else
            alert("no quedan mas " + productoCompra.marca + " talle " + productoCompra.talle);
    }

    /* elimina el producto en la posición pos */
    quitarProducto(pos)
    {
        this.productosCarrito[pos].cantDisponible++; //modificar------------------
        this.productosCarrito.splice(pos,1);
    }

    totalCompra()
    {
        let valorTotal = 0;
        for (const producto in this.productosCarrito)
        {
            valorTotal += producto.precio; 
        }
        return valorTotal;
    }

    totalCompraEnCuotas(cantCuotas)
    {
        //hasta 6 cuotas sin interés
        if(cantCuotas <=6)
            valorTotal = this.totalCompra();
        else
            let valorTotal = this.totalCompra() * 0.05 * cantCuotas; //por cada cuota hay un 5% de interés
        return valorTotal;
    }

    valorCuota(cantCuotas)
    {
        return this.totalCompraEnCuotas(cantCuotas) / cantCuotas;
    }
}

/* clase Tienda */
class Tienda{
    constructor(listaProductos, carrito)
    {
        this.listaProductos = listaProductos;
        this.carrito = carrito;
    }

    agregarAlCarrito(productoCompra)
    {

    }

    quitarDelCarrito(productoCompra)
    {



    }

}

function cargarProductosTienda()
{
        /*
    let zapatilla1 = new Producto("Nike-AF-1","Nike Air Force", "Nike","Blanco", 22000, 42);
    zapatilla1.setCantidad(3);
    console.log(zapatilla1.getCantidad());
    console.log(zapatilla1.cantDisponible);
    zapatilla1.precio = 40000;
    console.log(zapatilla1.precio);


    agregarProducto();
    */


}

cargarProductosTienda();