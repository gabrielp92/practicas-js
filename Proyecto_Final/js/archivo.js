/************************************* CLASES *********************************************** */

/* clase Producto */
class Producto
{
    constructor(id,imgUrl,titulo,marca,precio,talle,cantDisponible)
    {
        this.id = id;
        this.imgUrl = imgUrl; //para luego poder cargar la imágen del producto
        this.titulo = titulo;
        this.marca = marca;
        this.precio = precio;
        this.talle = talle;
        this.descripcion = "";
        this.cantDisponible = cantDisponible;    //cantidad disponible en la tienda
        this.cantEnCarrito = 0;                 //cantidad seleccionada en el carrito de ese producto    
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

    agregarProducto(productoCompra,e)
    {
        if(this.buscarProducto(productoCompra) == null)
        {
            //se agrega el producto por primera vez en el carrito.
            this.productosCarrito.push(productoCompra);
            productoCompra.cantEnCarrito++;
            let contenedorProdCarrito = document.querySelector('#infoCarritoMain');
            const divProdCarrito = document.createElement('div');
            divProdCarrito.style.border = '1.5px groove rgba(33,37,41,.25)';
            divProdCarrito.style.marginBottom = '.5rem';
            divProdCarrito.style.paddingTop = '.5rem';
            divProdCarrito.style.paddingBottom = '.5rem';
            divProdCarrito.style.textAlign = 'center';
            divProdCarrito.setAttribute('id', productoCompra.titulo);
            contenedorProdCarrito.appendChild(divProdCarrito);
            document.getElementById(`${productoCompra.titulo}`).textContent = productoCompra.titulo + ' - \nCantidad: ' + productoCompra.cantEnCarrito;
           
            comprados.push(e);
        } 
        else{
            //solamente aumento la cantidad del producto en el carrito porque ya se encuentra en él.
            productoCompra.cantEnCarrito++;
            document.getElementById(`${productoCompra.titulo}`).textContent = productoCompra.titulo + ' - \nCantidad: ' + productoCompra.cantEnCarrito;
        } 
    }
    
    buscarProducto(producto)
    {
        const prod = this.productosCarrito.find( prod =>  prod.id == producto.id)
        return prod;
    }

    /* elimina el producto en la posición pos */
    quitarProducto(pos)
    {
        this.productosCarrito.splice(pos,1);
    }

    totalCompra()
    {
        let valorTotal = 0;

        for (const producto of this.productosCarrito)
        {
            valorTotal += producto.precio * producto.cantEnCarrito; 
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

            let nuevoProducto = new Producto(producto.id, producto.imgUrl, producto.titulo, producto.marca, producto.precio, producto.talle, producto.cantDisponible);
            tienda.agregarProducto(nuevoProducto);

            templateCard.querySelector('img').setAttribute('src', producto.imgUrl);
            templateCard.querySelector('h5').textContent = producto.titulo;
            templateCard.querySelector('h6').textContent = "Cant. disponible: " + producto.cantDisponible;
            templateCard.querySelector('p').textContent = "$ " + producto.precio;
            templateCard.querySelector('p').style.fontSize = '1.75rem';
            templateCard.querySelector('.btn-dark').dataset.id = producto.id;
            const clone = templateCard.cloneNode(true);
            fragment.appendChild(clone);
        })
        items.appendChild(fragment);
    }

    items.addEventListener('click', e => {
        oyenteBtnComprar(e);
    })
}

function crearMenuCuotasCarrito()
{
    const cuotas = [1,3,6,9,12,18,24];
    let contenedorCompra = document.getElementById('infoCarritoFooter');
    const lblCuotas = document.createElement('p');
    lblCuotas.innerText = 'Cuotas disponibles';
    const selectMenu = document.createElement('select');
    contenedorCompra.appendChild(lblCuotas);
    contenedorCompra.appendChild(selectMenu);
    lblCuotas.style.margin = '0px 0px 0px';
    lblCuotas.style.textAlign = 'center';
    selectMenu.classList.add('form-select', 'form-select-sm', 'selectCuotas');
    selectMenu.style.alignSelf = 'center';
    const fragment = document.createDocumentFragment();
    for (const cuota of cuotas)
    {
        const optionMenu = document.createElement('option');
        optionMenu.textContent = cuota;
        fragment.appendChild(optionMenu);
    }
    selectMenu.appendChild(fragment);
}

function crearBtnFinalizarCompraCarrito()
{
    let contenedorBtn = document.getElementById('infoCarritoFooter');
    const btnFinalizarCompra = document.createElement('button');
    btnFinalizarCompra.textContent = "finalizar compra";
    contenedorBtn.appendChild(btnFinalizarCompra);
    btnFinalizarCompra.classList.add('btn', 'btn-success', 'mx-auto');
    btnFinalizarCompra.addEventListener('click', () => 
    {
        const productosSinCantidadDisp = tienda.carrito.productosCarrito.filter(producto => producto.cantDisponible < producto.cantEnCarrito);
        if(productosSinCantidadDisp.length != 0)
        {
            const strProductos = productosSinCantidadDisp.map(function(prod){return prod.titulo});
            alert('No se puede finalizar la compra porque hay menos cantidad disponible de:\n- '+ strProductos.join('\n- ') + '\nElija menos cantidad si desea continuar con la compra.');  
        }
        else
        {
            const cantCuotas = parseInt(document.querySelector("#infoCarritoFooter select").value);
            alert("Total compra: $" + tienda.carrito.totalCompraEnCuotas(cantCuotas).toFixed(2) + " en " + cantCuotas + " cuotas.\nValor cuota: $" + tienda.carrito.valorCuota(cantCuotas).toFixed(2));
            tienda.carrito.productosCarrito.forEach(prod => { 
                prod.cantDisponible -= prod.cantEnCarrito;
                comprados.splice(0,1)[0].target.parentElement.querySelector('h6').textContent = "Cant. disponible: " + prod.cantDisponible;
               
            });
        } 
    });
}

function crearFooterCarrito()
{
    let contenedorFooter = document.getElementById('infoCarritoFooter');
    const separador = document.createElement('hr');
    const lblValorCompra = document.createElement('h4');
    lblValorCompra.textContent = 'Total: $';
    lblValorCompra.style.textAlign = 'center';
    lblValorCompra.style.color = 'red';
    contenedorFooter.appendChild(separador);
    contenedorFooter.appendChild(lblValorCompra);
    crearMenuCuotasCarrito();
    crearBtnFinalizarCompraCarrito();
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
                document.getElementById('infoCarritoFooter').innerText = ' ';
                crearFooterCarrito();
            }
            tienda.carrito.agregarProducto(producto,e);
            alert(producto.titulo + ' agregado al carrito');
            document.querySelector('#infoCarritoFooter h4').textContent = 'Total: $ ' + tienda.carrito.totalCompra().toFixed(2);
        }
        else
            alert("no se pudo agregar al carrito: no disponible en la tienda");
    }
    e.stopPropagation();
}

/*------------------------------------- CREACIÓN DE ELEMENTOS -----------------------------------------*/
let tienda = crearTienda();
cargarProductosTienda(tienda);
let comprados = []; //se utiliza para poder modificar la cantidad disponible del producto comprado.
                    //Guardo los eventos asociados al botón del producto que fue clickeado.
