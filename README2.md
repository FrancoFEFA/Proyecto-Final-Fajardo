# 🔄 Evolución del Proyecto – Simulador de Productos

## 📌 Introducción

Este documento describe las mejoras y nuevas implementaciones realizadas en el **Proyecto Final**, en comparación con la entrega anterior.

El sistema permite la gestión de productos incorporando persistencia de datos, validaciones avanzadas, una interfaz moderna y una estructura de código modular.

---

## 🚀 Características principales

### 🌐 Persistencia de datos híbrida

La aplicación combina múltiples fuentes de datos:

* **LocalStorage** para persistencia en el navegador
* **Archivo JSON externo (`fetch`)** como fuente inicial de datos

Al iniciar:

* Si existen datos en LocalStorage → se utilizan
* Si no existen → se cargan automáticamente desde `productos.json`

Esto simula el comportamiento de una API real.

---

### 🆔 Identificación única de productos

Cada producto cuenta con un **ID único generado dinámicamente**.

Esto permite:

* Manipulación precisa (eliminar/modificar)
* Evitar conflictos por duplicados
* Independencia del orden en arrays

---

### ⚠️ Validaciones robustas

El sistema implementa validaciones completas:

* Nombre: entre 3 y 50 caracteres
* Precio: numérico, mayor a 0 y dentro de un rango válido
* Categoría: obligatoria

Los errores:

* Se muestran directamente en la interfaz
* Son claros y específicos

---

### 🎨 Interfaz moderna con SweetAlert2

Se integró **SweetAlert2** para mejorar la interacción:

* Confirmaciones antes de eliminar
* Alertas de éxito al agregar productos
* Feedback visual inmediato

---

### 🎯 Experiencia de usuario (UX)

Se optimizó la interacción con el usuario:

* Animaciones suaves en renderizado
* Efectos hover en tarjetas
* Botones con transiciones
* Filtros por categoría con indicador activo
* Diseño responsive adaptable
* Uso de sombras, gradientes y bordes modernos

---

### 🧠 Arquitectura y organización del código

El código está estructurado por responsabilidades:

| Función                      | Responsabilidad          |
| ---------------------------- | ------------------------ |
| `validarProducto()`          | Validación de datos      |
| `mostrarErroresFormulario()` | Render de errores        |
| `obtenerDatosFormulario()`   | Lectura del DOM          |
| `agregarProducto()`          | Alta de productos        |
| `eliminarProducto()`         | Baja de productos        |
| `renderizarProductos()`      | Renderizado en el DOM    |
| `calcularTotales()`          | Cálculo de totales       |
| `calcularPorCategoria()`     | Agrupación por categoría |
| `configurarEventos()`        | Eventos del sistema      |
| `iniciarApp()`               | Inicialización general   |


---

### 📊 Gestión eficiente de datos

Se optimizaron los cálculos mediante:

* `reduce()` para totales
* Agrupación por categorías
* Centralización de lógica de cálculo

---

## 📁 Estructura del proyecto

```
ProyectoFinalFajardo/
├── index.html
├── css/
│   └── estilos.css
├── js/
│   └── script.js
├── data/
│   └── productos.json
└── README.md
```

---

## 🛠️ Tecnologías utilizadas

* HTML
* CSS (animaciones, responsive design)
* JavaScript (ES6+, async/await, fetch, arrays avanzados)
* SweetAlert2
* LocalStorage

---

## 👨‍💻 Autor

**Franco Fajardo**
