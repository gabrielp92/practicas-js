/************************************* CLASES *********************************************** */

/* clase Producto */
class Producto
{
    constructor(id,imgUrl,titulo,marca,precio,talle)
    {
        this.id = id;
        this.imgUrl = imgUrl; //para luego poder cargar la imágen del producto
        this.titulo = titulo;
        this.marca = marca;
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
            productoCompra.cantDisponible--;
        }
        else
            alert("no quedan mas " + productoCompra.marca + " talle " + productoCompra.talle);
    }

    /* elimina el producto en la posición pos */
    quitarProducto(pos)
    {
        this.productosCarrito[pos].cantDisponible++;
        this.productosCarrito.splice(pos,1);
    }

    totalCompra()
    {
        let valorTotal = 0;

        for (const producto of this.productosCarrito)
        {
            valorTotal += producto.precio; 
        }
        return valorTotal;
    }

    totalCompraEnCuotas(cantCuotas)
    {
        //hasta 6 cuotas sin interés
        let valorTotal;
        if((cantCuotas >= 0) && (cantCuotas <=6))
            valorTotal = this.totalCompra();
        else
            valorTotal = this.totalCompra() * ( 1 + 0.05 * cantCuotas); //por cada cuota hay un 5% de interés
        return valorTotal;
    }

    valorCuota(cantCuotas)
    {
        return this.totalCompraEnCuotas(cantCuotas) / cantCuotas;
    }
}

/* clase Tienda */
class Tienda{
    constructor()
    {
        this.listaProductos = [];
        this.carrito = new Carrito();
    }

    /* se agrega un producto a la tienda */
    agregarProducto(producto)
    {
        this.listaProductos.push(producto);
    }

    quitarProducto(producto)
    {
        //recorrer y comparar en la lista de productos

    }

    /* Devuelve el producto con el título ingresado como párametro. Si no se encuentra el producto, retorna 0 */
    buscarProducto(idProducto)
    {
        let producto = 0;
        for (let productoTienda of this.listaProductos)
        {
            if(productoTienda.id == idProducto)
            {
                producto = productoTienda;
            }
        }
        return producto;
    }

    /*
    quitarDelCarrito(productoCompra)
    { }*/
}

/************************************ FUNCIONES *********************************************************** */

/* función crearTienda */
function crearTienda()
{
    let nuevaTienda = new Tienda();
    return nuevaTienda;
}

/* se leen y pintan los productos de la tienda en el sitio */
function cargarProductosTienda(tienda)
{
    const items = document.getElementById('items');
    const templateCard = document.getElementById('template-card').content;
    const fragment = document.createDocumentFragment(); //se utiliza para evitar reflow

    document.addEventListener('DOMContentLoaded' , () => {
        fetchData();
    })

    const fetchData = async () => {
        try{
            const res = await fetch('../json/productos.json');
            const data = await res.json();
            pintarCards(data);
        }
        catch(error)
        {
            console.log(error);
        }
    }

    const pintarCards = (data) => {
        data.forEach( producto => {
            templateCard.querySelector('img').setAttribute('src', producto.imgUrl);
            templateCard.querySelector('h5').textContent = producto.titulo;
            templateCard.querySelector('p').textContent = "$ " + producto.precio;
            templateCard.querySelector('.btn-dark').dataset.id = producto.id;
            const clone = templateCard.cloneNode(true);
            fragment.appendChild(clone);

            let nuevoProducto = new Producto(producto.id, producto.imgUrl, producto.titulo, producto.marca, producto.precio, producto.talle);
            nuevoProducto.setCantidad(5); //inicialmente habrá 5 productos de cada uno
            tienda.agregarProducto(nuevoProducto);
        })
        items.appendChild(fragment);
    }

    items.addEventListener('click', e => {
        oyenteBtnComprar(e);
    })
}

function crearMenuCuotas()
{
    const cuotas = [1,3,6,9,12,18,24];
    let contenedorCompra = document.getElementById('compra');
    const selectMenu = document.createElement('select');
    contenedorCompra.appendChild(selectMenu);
    document.querySelector("select").classList.add('form-select', 'form-select-sm', 'main__contenedor__menu__select');
    document.querySelector("div#compra select").style.height = "66%";

    const fragment = document.createDocumentFragment();
    for (const cuota of cuotas)
    {
        const optionMenu = document.createElement('option');
        optionMenu.textContent = cuota;
        fragment.appendChild(optionMenu);
    }
    selectMenu.appendChild(fragment);
}

function crearBtnFinalizarCompra()
{
    let contenedorCarrito = document.getElementById('compra');
    const btnFinalizarCompra = document.createElement('null');
    crearMenuCuotas();
    btnFinalizarCompra.textContent = "Finalizar compra";
    contenedorCarrito.appendChild(btnFinalizarCompra);
    document.querySelector("null").classList.add('btn', 'btn-outline-success', 'main__contenedor__btn');
    btnFinalizarCompra.addEventListener('click', () => 
    {
        const cantCuotas = parseInt(document.querySelector("div#compra select").value);
        alert("Total compra: $" + tienda.carrito.totalCompraEnCuotas(cantCuotas).toFixed(2) + " en " + cantCuotas + " cuotas.\nValor cuota: $" + tienda.carrito.valorCuota(cantCuotas).toFixed(2));
    });
}

function oyenteBtnComprar(e)
{
    if(e.target.classList.contains('btn-dark'))
    {
        //primero obtengo el id del producto clickeado que se quiere agregar al carrito
        const id = e.target.parentElement.querySelector('.btn-dark').dataset.id; 
        const producto = tienda.buscarProducto(id);
        if(producto != 0)
        {
            if(tienda.carrito.productosCarrito.length == 0)
            {
                crearBtnFinalizarCompra();
            }
            tienda.carrito.agregarProducto(producto);
            alert(producto.titulo + ' agregado al carrito.\nArriba de los productos se habilitó un botón para finalizar la compra según la cantidad de cuotas seleccionada');
        }
        else
            alert("no se pudo agregar al carrito: no disponible en la tienda");
    }
    e.stopPropagation();
}

/*------------------------------------- CREACIÓN DE ELEMENTOS -----------------------------------------*/
let tienda = crearTienda();
cargarProductosTienda(tienda);

