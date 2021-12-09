const catalogo = [
    {
        name: "Dibujo Tradicional Superman",
        price: 100
    },
    {
        name: "Dibujo Tradicional Batman",
        price: 150
    },
    {
        name: "Dibujo Digital Pokemon",
        price: 50
    }
]

function agregarProductoCarrito(nombre, precio){
    const div = document.createElement('div')
    div.innerHTML=`
    <div class="product-cart">
        <h2 class="product-name-cart">${nombre}</h2>
        <h3 class="price-cart">Precio: $${precio}</h3>
        <h3 class="quantity-cart">Cantidad: 1</h3>
        <button>Remover del carrito</button>
    </div>`
    const minicartList = document.getElementById('products-minicart')
    minicartList.appendChild(div)
}

function aumentarCantidad(nombre){
    const carrito = document.getElementById("products-minicart")
    const listaNombres = Array.prototype.slice.call( carrito.getElementsByTagName("h2") )

    const h2Target = listaNombres.find(function(h2){
        if(h2.innerText===nombre){
            return true
        }
    })
    console.log(listaNombres)
    console.log(h2Target)
    const padre = h2Target.parentNode
    const cantidadTexto = padre.getElementsByClassName("quantity-cart")[0]
    const cantidadAnterior = parseInt(cantidadTexto.innerText.split(" ")[1])
    cantidadTexto.innerText=`Cantidad: ${cantidadAnterior+1}`
    console.log(cantidadTexto)
}

function agregarProductoPlp(producto){
    const div = document.createElement('div')
    div.innerHTML=`
    <div class="product-plp">
        <h2 class="product-name-plp">${producto.name}</h2>
        <h3 class="price-plp">Precio: $${producto.price}</h3>
        <button>Agregar al carrito</button>
    </div>`
    const plpList = document.getElementById('products-plp')
    plpList.appendChild(div)
}

for(let producto of catalogo){
    agregarProductoPlp(producto)
}

document.getElementById("plp").addEventListener("click",
    function(event){
        const boton = event.target
        if(boton.localName==="button"){
            const padre = boton.parentNode
            const nombre = padre.getElementsByTagName("h2")[0].innerText
            const precio = padre.getElementsByTagName("h3")[0].innerText.split("$")[1]

            const productosEnCarrito = Array.prototype.slice.call( document.getElementsByClassName('product-cart') )
            let productoEnCarrito

            if(productosEnCarrito){
                productoEnCarrito = productosEnCarrito.find(function(producto){
                    const nombreProductoEnCarrito = producto.getElementsByTagName("h2")[0].innerText
                    if(nombreProductoEnCarrito===nombre){
                        return true
                    }
                })
            }

            
            if(productoEnCarrito){
                console.log("El producto esta en el carrito")
                aumentarCantidad(nombre)
            } else {
                console.log("El producto no esta en el carrito")
                agregarProductoCarrito(nombre, precio)
            }
        }
    }
)