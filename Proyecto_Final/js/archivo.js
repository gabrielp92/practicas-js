/************************************* CLASES *********************************************** */

/* clase Producto */
class Producto
{
    constructor(rutaImg,titulo,marca,precio,talle)
    {
        this.rutaImg = rutaImg; //para luego poder cargar la imágen del producto
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
    buscarProducto(tituloProducto)
    {
        let producto = 0;
        for (let productoTienda of this.listaProductos)
        {
            if(productoTienda.titulo == tituloProducto)
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

/* función que agrega un producto al menú desplegable */
function agregarAlMenu()
{
    const menuProductos = document.querySelector('#menuProductos');
    const template = document.querySelector('#template-option').content;
    const fragment = document.createDocumentFragment();

    //se usa fragment y template html para agregar los nombres de productos al menú desplegable
    tienda.listaProductos.forEach(producto => {
        template.querySelector('option').textContent = producto.titulo;
        const clone = template.cloneNode(true);
        fragment.appendChild(clone); 
    });
    menuProductos.appendChild(fragment);
}

/* se crean los productos de la tienda */
function cargarProductosTienda(tienda)
{
    let zapatilla1 = new Producto("NB-327","NEW BALANCE NB 327", "NEW BALANCE", 17049, 42);
    zapatilla1.setCantidad(3);
    tienda.agregarProducto(zapatilla1);
    let zapatilla2 = new Producto("NB-574-SPORT","NEW BALANCE NB 574 SPORT", "NEW BALANCE", 18399, 40);
    zapatilla2.setCantidad(4);
    tienda.agregarProducto(zapatilla2);
    let zapatilla3 = new Producto("NB-X90","NEW BALANCE NB X90", "NEW BALANCE", 19599, 41);
    zapatilla3.setCantidad(6);
    tienda.agregarProducto(zapatilla3);
    let zapatilla4 = new Producto("NIKE-AIR-MAX-720","NIKE AIR MAX 720", "NIKE", 39899, 42);
    zapatilla4.setCantidad(5);
    tienda.agregarProducto(zapatilla4);
    let zapatilla5 = new Producto("NIKE-PEGASUS-36","AIR ZOOM PEGASUS 36", "NIKE", 27499, 41);
    zapatilla5.setCantidad(4);
    tienda.agregarProducto(zapatilla5);
    let zapatilla6 = new Producto("NIKE-VOMERO-14","AIR ZOOM VOMERO 14", "NIKE", 34099, 40);
    zapatilla6.setCantidad(3);
    tienda.agregarProducto(zapatilla6);

    agregarAlMenu();    //agrego los nombres de los productos al menú desplegable.
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

function crearBtnComprar()
{
    let contenedorCarrito = document.getElementById('compra');
    const btnComprar = document.createElement('null');
    crearMenuCuotas();
    btnComprar.textContent = "comprar";
    contenedorCarrito.appendChild(btnComprar);
    document.querySelector("null").classList.add('btn', 'btn-outline-success', 'main__contenedor__btn');
    btnComprar.addEventListener('click', () => 
    {
        const cantCuotas = parseInt(document.querySelector("div#compra select").value);
        alert("Total compra: $" + tienda.carrito.totalCompraEnCuotas(cantCuotas).toFixed(2) + " en " + cantCuotas + " cuotas.\nValor cuota: $" + tienda.carrito.valorCuota(cantCuotas).toFixed(2));
    });
}

function oyenteBtnAgregarCarrito()
{
    const btnAgregar = document.querySelector('.btn-outline-danger');
    btnAgregar.addEventListener('click', ()=>
        {  
            let prodSelected = document.getElementById('menuProductos').value;
            let producto = tienda.buscarProducto(prodSelected); //se busca el producto por el título (el que aparece en el menú)
            if(producto != 0)
            {
                if(tienda.carrito.productosCarrito.length == 0)
                {
                    crearBtnComprar();
                }
                tienda.carrito.agregarProducto(producto);
                document.getElementById('resultado').textContent = producto.titulo + " agregado al carrito";
            }
            else
                alert("no se pudo agregar al carrito: no disponible en la tienda");
        });
}

/*------------------------------------- CREACIÓN DE ELEMENTOS -----------------------------------------*/
let tienda = crearTienda();
cargarProductosTienda(tienda);
oyenteBtnAgregarCarrito();
