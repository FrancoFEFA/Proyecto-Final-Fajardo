const STORAGE_KEY = "productos"

const CATEGORIAS = {
    verduras: "Verdura",
    frutas: "Fruta",
    limpieza: "Limpieza",
    otros: "Otros"
}

class Producto {
    constructor(nombre, precio, categoria) {
        this.id = Date.now()
        this.nombre = nombre
        this.precio = precio
        this.categoria = categoria
    }
}

let productos = []
let filtroActual = "todos"

// -- Cargar y guardar productos en localStorage
function cargarProductos() {
    const data = localStorage.getItem(STORAGE_KEY)
    if (data) productos = JSON.parse(data)
}

function guardarProductos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(productos))
}

// -- Validar datos del formulario
function validarProducto(datos) {
    const errores = []

    // Validar nombre
    if (!datos.nombre.trim()) {
        errores.push("El nombre es obligatorio")
    } else if (datos.nombre.trim().length < 3) {
        errores.push("El nombre debe tener al menos 3 caracteres")
    } else if (datos.nombre.trim().length > 50) {
        errores.push("El nombre no puede exceder 50 caracteres")
    }

    // Validar precio
    if (datos.precio === "" || datos.precio === null) {
        errores.push("El precio es obligatorio")
    } else if (isNaN(datos.precio)) {
        errores.push("El precio debe ser un número válido")
    } else if (parseFloat(datos.precio) <= 0) {
        errores.push("El precio debe ser mayor a 0")
    } else if (parseFloat(datos.precio) > 999999) {
        errores.push("El precio no puede ser mayor a 999999")
    }

    // Validar categoría
    if (!datos.categoria || datos.categoria === "") {
        errores.push("Debe seleccionar una categoría")
    }

    // Mostrar errores
    if (errores.length > 0) {
        mostrarErroresFormulario(errores)
        return false
    }

    limpiarErroresFormulario()
    return true
}

// -- Mostrar errores en el formulario
function mostrarErroresFormulario(errores) {
    const contenedor = document.getElementById("erroresFormulario")
    contenedor.innerHTML = errores.map(e => `<p class="error-item">❌ ${e}</p>`).join("")
    contenedor.style.display = "block"
}

// -- Limpiar errores del formulario
function limpiarErroresFormulario() {
    const contenedor = document.getElementById("erroresFormulario")
    contenedor.innerHTML = ""
    contenedor.style.display = "none"
}

// -- Obtener y limpiar datos del formulario
function obtenerDatosFormulario() {
    return {
        nombre: document.getElementById("nombreProducto").value,
        precio: document.getElementById("precioProducto").value,
        categoria: document.getElementById("categoriaProducto").value
    }
}

function limpiarFormulario() {
    document.getElementById("nombreProducto").value = ""
    document.getElementById("precioProducto").value = ""
    document.getElementById("categoriaProducto").value = ""
    limpiarErroresFormulario()
}

// -- CRUD: agregar y eliminar productos
function agregarProducto() {
    const datos = obtenerDatosFormulario()
    if (!validarProducto(datos)) return

    const precioNumerico = parseFloat(datos.precio)
    productos.push(new Producto(datos.nombre, precioNumerico, datos.categoria))
    guardarProductos()
    renderizarProductos()
    limpiarFormulario()

    Swal.fire({ 
        icon: "success", 
        title: " Producto agregado", 
        text: `"${datos.nombre}" ha sido agregado exitosamente`,
        timer: 1500, 
        showConfirmButton: false 
    })
}

function eliminarProducto(id) {
    Swal.fire({
        title: "Eliminar producto?",
        showCancelButton: true,
        confirmButtonText: "Si"
    }).then(result => {
        if (result.isConfirmed) {
            // Convertir id a Number para comparación correcta
            productos = productos.filter(p => p.id !== Number(id))
            guardarProductos()
            renderizarProductos()
        }
    })
}

// -- Calcular totales y subtotales por categoría
function calcularTotales(lista) {
    return {
        cantidad: lista.length,
        total: lista.reduce((acc, p) => acc + p.precio, 0).toFixed(2)
    }
}

function calcularPorCategoria() {
    const base = { verduras: [], frutas: [], limpieza: [], otros: [] }
    productos.forEach(p => base[p.categoria].push(p))
    return base
}

// -- Renderizar productos en la interfaz
function renderizarProductos() {
    const contenedor = document.getElementById("listaProductos")
    contenedor.innerHTML = ""

    const lista = filtroActual === "todos"
        ? productos
        : productos.filter(p => p.categoria === filtroActual)

    lista.forEach(producto => {
        const div = document.createElement("div")
        div.className = "producto"

        div.innerHTML = `
            <strong>${producto.nombre}</strong> - $${producto.precio}
            (${CATEGORIAS[producto.categoria]})
            <button data-id="${producto.id}">Eliminar</button>
        `

        contenedor.appendChild(div)
    })

    mostrarTotales(lista)
    mostrarTotalesCategoria()
}

function mostrarTotales(lista) {
    const { cantidad, total } = calcularTotales(lista)

    document.getElementById("totalProductos").innerHTML = `
        <div class="total-principal">
            ${cantidad} productos = $${total}
        </div>`
}

function mostrarTotalesCategoria() {
    const datos = calcularPorCategoria()
    let html = ""

    for (let cat in datos) {
        const total = calcularTotales(datos[cat])
        html += `
            <div class="categoria-total">
                <span>${CATEGORIAS[cat]}</span>
                <span>${total.cantidad}</span>
                <span>$${total.total}</span>
            </div>
        `
    }

    document.getElementById("totalesCategoria").innerHTML = html
}

// -- Configurar eventos de botones e interacción
function configurarEventos() {

    document.getElementById("btnAgregar").addEventListener("click", agregarProducto)

    document.getElementById("listaProductos").addEventListener("click", e => {
        if (e.target.tagName === "BUTTON") {
            eliminarProducto(e.target.dataset.id)
        }
    })

    document.querySelectorAll(".filtros button").forEach(btn => {
        btn.addEventListener("click", e => {

            document.querySelectorAll(".filtros button").forEach(b => {
                b.classList.remove("filtro-activo")
                b.classList.add("filtro")
            })

            e.target.classList.add("filtro-activo")

            const id = e.target.id

            filtroActual =
                id === "btnTodos" ? "todos" :
                id === "btnVerduras" ? "verduras" :
                id === "btnFrutas" ? "frutas" :
                id === "btnLimpieza" ? "limpieza" : "otros"

            renderizarProductos()
        })
    })
}

// -- Inicializar aplicación
async function iniciarApp() {
    // Verificar si hay datos guardados: si sí, respeta eliminaciones; si no, carga JSON
    const hayDatosGuardados = localStorage.getItem(STORAGE_KEY) !== null
    
    if (hayDatosGuardados) {
        cargarProductos()
    } else {
        try {
            const res = await fetch("data/productos.json")
            if (!res.ok) throw new Error("fetch fallo")
            const data = await res.json()

            // Generar IDs únicos: Date.now() + índice evita duplicados
            productos = data.map((p, i) => {
                const prod = new Producto(p.nombre, p.precio, p.categoria)
                prod.id = Date.now() + i
                return prod
            })

            guardarProductos()
        } catch (e) {
            // Si fetch falla, iniciar con lista vacía
            productos = []
        }
    }

    renderizarProductos()
    configurarEventos()
}

iniciarApp()