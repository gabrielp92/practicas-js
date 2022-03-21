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

    agregarProducto(productoCompra,eTarget)
    {
        if(this.buscarProducto(productoCompra) == null)
        {
            //se agrega el producto por primera vez en el carrito.
            this.productosCarrito.push(productoCompra);
            if(productoCompra.cantEnCarrito == 0)
                productoCompra.cantEnCarrito = 1;
            let contenedorProdCarrito = document.querySelector('#infoCarritoMain');
            const divProdCarrito = document.createElement('div');
            divProdCarrito.style.border = '1.5px groove rgba(33,37,41,.25)';
            divProdCarrito.style.marginBottom = '.5rem';
            divProdCarrito.style.paddingTop = '.5rem';
            divProdCarrito.style.paddingBottom = '.5rem';
            divProdCarrito.style.textAlign = 'center';
            divProdCarrito.classList.add('shadow','bg-body','rounded');
            divProdCarrito.setAttribute('id', productoCompra.titulo.replace(/ /g, ""));
            const divBtnCerrar = document.createElement('div');
            divBtnCerrar.style.paddingRight = '.5rem';
            divBtnCerrar.style.textAlign = 'right';
            const btnCerrar = document.createElement('button');
            btnCerrar.classList.add('btn-close');
            divBtnCerrar.appendChild(btnCerrar);
            divBtnCerrar.onclick = oyenteBtnQuitarProducto;
            const imgProducto = document.createElement('img');
            imgProducto.setAttribute('src', productoCompra.imgUrl);
            imgProducto.classList.add('card-img-top');
            const textoTitulo = document.createElement('h5');
            textoTitulo.innerText = productoCompra.titulo;
            const textoProducto = document.createElement('p');
            textoProducto.innerText = 'Cantidad: ' + productoCompra.cantEnCarrito;
            textoProducto.style.marginBottom = '.25rem';
            //creo botones para modificar la cantidad del producto agregado
            const btnIncrementarProducto = document.createElement('button');
            const btnDecrementarProducto = document.createElement('button');
            btnIncrementarProducto.classList.add('btn', 'btn-info', 'btn-sm');
            btnIncrementarProducto.onclick = oyentBtnModifCantProducto;
            btnDecrementarProducto.classList.add('btn', 'btn-danger', 'btn-sm');
            btnDecrementarProducto.onclick = oyentBtnModifCantProducto;
            btnIncrementarProducto.textContent = '+';
            btnDecrementarProducto.textContent = '-';
            divProdCarrito.appendChild(divBtnCerrar);
            divProdCarrito.appendChild(imgProducto);
            divProdCarrito.appendChild(textoTitulo);
            divProdCarrito.appendChild(textoProducto);
            divProdCarrito.appendChild(btnIncrementarProducto)
            divProdCarrito.appendChild(btnDecrementarProducto);
            contenedorProdCarrito.appendChild(divProdCarrito);
            comprados.push(eTarget);
        } 
        else
        {
            productoCompra.cantEnCarrito++; //solamente aumento la cantidad del producto en el carrito porque ya se encuentra en él.
            document.querySelector(`#${productoCompra.titulo.replace(/ /g, "")} p`).innerText = 'Cantidad: ' + productoCompra.cantEnCarrito;
        } 
    }
    
    buscarProducto(producto)
    {
        const prod = this.productosCarrito.find( prod =>  prod.id == producto.id)
        return prod;
    }

    buscarPorTitulo(tituloProducto)
    {
        const prod = this.productosCarrito.find( prod =>  prod.titulo.replace(/ /g, "") == tituloProducto)
        return prod;
    }

    quitarProducto(tituloProducto)
    {
        const cantProductos = this.productosCarrito.length;
        let eliminado = [];
        let i = 0, encontre = false;
        while(!encontre && (i < cantProductos))
        {
            if(this.productosCarrito[i].titulo.replace(/ /g, "") == tituloProducto)
            {
                this.productosCarrito[i].cantEnCarrito = 0;
                eliminado = this.productosCarrito.splice(i,1);
                encontre = true;
            }
            else
                i++;
        }
        return eliminado[0];
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

function oyenteBtnQuitarProducto(event)
{
    //obtengo el div del producto a eliminar del carrito
    const divAEliminar = event.target.parentNode.parentNode;
    //remuevo el producto de la lista de productos de Carrito
    const eliminado = tienda.carrito.quitarProducto(divAEliminar.id);
    eliminarLocalStorage(eliminado);
    //remuevo cada hijo del div del producto a eliminar 
    Array.from(divAEliminar.children).forEach( hijo => {
        hijo.remove();
    });
    //elimino el div
    document.querySelector('#infoCarritoMain').removeChild(divAEliminar);
    //elimino el botón clickeado
    event.target.remove();
    //actualizo el valor de la compra (sin el valor del producto removido)
    actualizarTotal();
    //si el carrito queda sin productos también se elimina el footer del carrito porque ya no se utilizará.
    if(tienda.carrito.productosCarrito.length == 0)
    {
        eliminarTodoLocalStorage();
        eliminarFooterCarrito();
        document.getElementById('infoCarritoFooter').textContent = 'Carrito vacío';
    }
}

function oyentBtnModifCantProducto(event)
{
    //obtengo producto para modificar su cantidad en el carrito
    let producto = tienda.carrito.buscarPorTitulo(event.target.parentElement.id);

    if(event.target.classList.contains('btn-info')) //botón incrementar cantidad de producto
        producto.cantEnCarrito++;
    else                                            //botón decrementar cantidad de producto
        if(producto.cantEnCarrito > 1)
            producto.cantEnCarrito--;   
    event.target.parentElement.querySelector('p').innerText = 'Cantidad: ' + producto.cantEnCarrito;
    actualizarTotal();
    agregarLocalStorageProd(producto); //actualizo el local storage con el producto modificado
}

function actualizarTotal()
{
    document.querySelector('#infoCarritoFooter h4').textContent = 'Total: $ ' + tienda.carrito.totalCompra().toFixed(2);
}

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
     
        oyenteBtnComprar(e.target);
        e.stopPropagation();
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
    const btnCalcularCuota = document.createElement('button');
    btnCalcularCuota.textContent = 'calcular cuota';
    btnCalcularCuota.classList.add('btn','btn-outline-secondary','btn-sm', 'mx-auto');
    const lblValorCuota = document.createElement('h6');
    lblValorCuota.style.alignSelf = 'center';
    btnCalcularCuota.onclick = function()
    {
        lblValorCuota.textContent = 'Cuota: $' + tienda.carrito.valorCuota(selectMenu.value).toFixed(2);
    };
    contenedorCompra.appendChild(btnCalcularCuota);
    contenedorCompra.appendChild(lblValorCuota);
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
                //comprados.splice(0,1)[0].target.parentElement.querySelector('h6').textContent = "Cant. disponible: " + prod.cantDisponible;
                comprados.splice(0,1)[0].parentElement.querySelector('h6').textContent = "Cant. disponible: " + prod.cantDisponible;
            });
        } 
    });
}

function eliminarFooterCarrito()
{
    let contenedorFooter = document.getElementById('infoCarritoFooter');
    //remuevo cada hijo de contenedorFooter 
    Array.from(contenedorFooter.children).forEach( hijo => {
        hijo.remove();
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

function oyenteBtnComprar(eTarget)
{      
    if(eTarget.classList.contains('btn-dark'))
    {
        //primero obtengo el id del producto clickeado que se quiere agregar al carrito
        const btnAgregar =  eTarget.parentElement.querySelector('.btn-dark');
        const producto = tienda.buscarProducto(btnAgregar.dataset.id);
        if(producto != 0)  //si encuentra el producto en la tienda
        {
            //si el producto no está en el carrito entonces lo almaceno en el localStorage
            if(tienda.carrito.buscarProducto(producto) == null) 
                agregarLocalStorage(producto,eTarget);
            
            if(tienda.carrito.productosCarrito.length == 0)
            {
                document.getElementById('infoCarritoFooter').innerText = '';
                crearFooterCarrito();
            }
            tienda.carrito.agregarProducto(producto,eTarget);
            btnAgregar.onanimationstart = function(){
                btnAgregar.textContent = 'agregado al carrito';
            };
            btnAgregar.onanimationend =  function() {
                btnAgregar.textContent = 'agregar al carrito';
                btnAgregar.classList.remove('animacionBtnAgregarCarrito');
            };
            btnAgregar.classList.add('animacionBtnAgregarCarrito');
            actualizarTotal();
        }
        else
            alert("no se pudo agregar al carrito: no disponible en la tienda");
    }
}


/************************************ local storage Carrito **************************************/
function agregarLocalStorageProd(producto)
{
    const productoEnJSON = JSON.stringify(producto);
    localStorage.setItem(producto.id, productoEnJSON);
}

function agregarLocalStorage(producto, eTarget)
{
    const productoEnJSON = JSON.stringify(producto);
    localStorage.setItem(producto.id, productoEnJSON);
    const eTargetEnJSON = JSON.stringify(eTarget.outerHTML);
    localStorage.setItem(`btn${producto.id}`,eTargetEnJSON);
}

function eliminarLocalStorage(producto)
{
    localStorage.removeItem(`btn${producto.id}`);
    localStorage.removeItem(producto.id);
}

function eliminarTodoLocalStorage()
{
    localStorage.clear();
}

function restaurarLocalStorage()
{
    for(let i= 0; i < localStorage.length; i++)
    {
        let clave = localStorage.key(i);
        const valor = JSON.parse(localStorage.getItem(clave));
        if(!(clave.includes('btn')))
        {
            //se busca el event target que le corresponde al producto
            const valorETarget = JSON.parse(localStorage.getItem('btn'+clave)); 
            if(tienda.carrito.productosCarrito.length == 0)
            {
                document.getElementById('infoCarritoFooter').innerText = '';
                crearFooterCarrito();
            }
            tienda.carrito.agregarProducto(valor,valorETarget);
            actualizarTotal();
        }
    }
}

/*------------------------------------- CREACIÓN DE ELEMENTOS -----------------------------------------*/
let tienda = crearTienda();
cargarProductosTienda(tienda);
let comprados = []; //se utiliza para poder modificar la cantidad disponible del producto comprado.
                    //Guardo los targets de los eventos asociados al botón del producto que fue clickeado.
restaurarLocalStorage();
