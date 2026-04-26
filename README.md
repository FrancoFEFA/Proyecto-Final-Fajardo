# 🔄 Evolución del Proyecto – Simulador de Productos

## 📌 Introducción

Este documento describe las mejoras y nuevas implementaciones realizadas en el **Proyecto Final**, en comparación con la entrega anterior.

El objetivo fue transformar una aplicación funcional básica en una solución más **robusta, escalable y alineada con buenas prácticas de desarrollo web**.

---

## 🆚 Comparativa general

| Característica              | Entrega anterior              | Proyecto final                         |
| --------------------------- | ----------------------------- | -------------------------------------- |
| Persistencia de datos       | Solo LocalStorage             | LocalStorage + JSON remoto (`fetch`)   |
| Identificación de productos | Índice (`indexOf`)            | ID único (`Date.now()`)                |
| Validaciones                | Básicas (campos vacíos)       | Robustas (formato, rango, categoría)   |
| Interfaz de usuario         | Funcional sin feedback        | Mejorada con feedback visual           |
| Librerías externas          | No                            | Sí (SweetAlert2)                       |
| Carga de datos inicial      | Manual                        | Automática (`fetch` + `async/await`)   |
| Estructura del código       | Responsabilidades mezcladas   | Separación clara de funciones          |
| Cálculos                    | Lógica dispersa               | Centralizados con `reduce()`           |
| Escalabilidad               | Limitada                      | Mejor estructurada y modular           |

---

## ❌ Falencias de la entrega anterior

1. **Persistencia limitada:** Solo se utilizaba `localStorage`, sin carga inicial desde una fuente externa.
2. **Identificación de productos:** Se dependía de `indexOf`, lo que generaba ineficiencia y posibles errores con elementos duplicados.
3. **Validaciones básicas:** Únicamente se verificaban campos vacíos, sin control de formato ni valores inválidos.
4. **Sin librerías externas:** La interfaz carecía de mejoras de experiencia de usuario como alertas visuales modernas.
5. **Carga de datos manual:** No existía inicialización automática de datos mediante JSON o `fetch`.
6. **Estructura mejorable:** Algunas funciones y responsabilidades no estaban claramente separadas.
7. **Cálculos poco optimizados:** La lógica para totales no estaba centralizada ni aprovechaba métodos eficientes.
8. **Experiencia de usuario básica:** No había feedback visual claro ante acciones del usuario.
9. **Dependencia de índices:** La manipulación de datos dependía de posiciones en arrays en lugar de identificadores únicos.

---

## 🚀 Mejoras implementadas

### 🌐 1. Uso de datos remotos (JSON + Fetch)

Se incorporó un archivo `productos.json` para simular una fuente de datos externa.

**Antes:**

* Los datos se cargaban manualmente o desde `localStorage` únicamente.

**Ahora:**

* Al iniciar la aplicación, si no hay datos guardados, se cargan automáticamente desde un archivo JSON externo.
* Esto permite separar los datos de la lógica, simulando el comportamiento de una API real.

---

### 🆔 2. Identificación única de productos

**Antes:**

* Se buscaba cada producto por su posición en la lista, lo que podía generar errores si había productos repetidos o si el orden cambiaba.

**Ahora:**

* Cada producto recibe un identificador único al momento de ser creado.
* Esto permite eliminar o modificar un producto específico sin riesgo de afectar a otros.

---

### ⚠️ 3. Validaciones mejoradas

**Antes:**

* Solo se verificaba que los campos no estuvieran vacíos.

**Ahora:**

* El nombre debe tener entre 3 y 50 caracteres.
* El precio debe ser un número válido, mayor a 0 y con un límite máximo.
* La categoría es obligatoria.
* Se muestran mensajes de error claros directamente en la interfaz.

---

### 🎨 4. Integración de librería externa (SweetAlert2)

Se incorporó **SweetAlert2** para reemplazar las alertas nativas del navegador con alertas visuales modernas.

**Implementaciones:**

* Alertas de éxito al agregar un producto.
* Confirmación interactiva antes de eliminar un producto.
* Feedback visual inmediato en cada acción del usuario.

---

### 🎯 5. Mejora en la experiencia de usuario (UX)

**Antes:**

* No había respuesta visual clara ante las acciones del usuario.

**Ahora:**

* Animaciones suaves al mostrar productos y errores.
* Efecto de elevación al pasar el cursor sobre las tarjetas de producto.
* Botones con transiciones y respuesta al clic.
* Filtros por categoría con indicador visual del filtro activo.
* Diseño adaptable a dispositivos móviles (responsive).
* Interfaz con gradientes, sombras y bordes redondeados.

---

### 🧠 6. Refactorización del código

Se reorganizó el código para mejorar la legibilidad y la separación de responsabilidades.

**Antes:**

* Algunas funciones y responsabilidades no estaban claramente separadas.

**Ahora:**

Se estructuró el código en bloques funcionales claros:

| Función                      | Responsabilidad                          |
| ---------------------------- | ---------------------------------------- |
| `validarProducto()`          | Validación completa de datos de entrada  |
| `mostrarErroresFormulario()` | Renderizado de errores en la interfaz    |
| `obtenerDatosFormulario()`   | Obtención limpia de valores del DOM      |
| `agregarProducto()`          | Lógica CRUD de alta (agregar producto)   |
| `eliminarProducto()`         | Lógica CRUD de baja (eliminar producto)  |
| `renderizarProductos()`      | Renderizado de la lista en el DOM        |
| `calcularTotales()`          | Cálculo centralizado de cantidades       |
| `calcularPorCategoria()`     | Agrupación de productos por categoría    |
| `configurarEventos()`        | Inicialización de Event Listeners        |
| `iniciarApp()`               | Punto de entrada con carga asincrónica   |

---

### 📊 7. Optimización en cálculos

**Antes:**

* La lógica para calcular totales estaba dispersa y era difícil de mantener.

**Ahora:**

* Los cálculos de cantidades y totales están centralizados en funciones específicas.
* Se agrupan los productos por categoría para mostrar subtotales de forma clara y ordenada.

---

## 📁 Estructura del proyecto

```
ProyectoFinalFajardo/
├── index.html              # Estructura principal de la aplicación
├── css/
│   └── estilos.css         # Estilos, animaciones y diseño responsive
├── js/
│   └── script.js           # Lógica de la aplicación (clases, CRUD, validaciones)
├── data/
│   └── productos.json      # Datos iniciales simulando una fuente externa
└── README.md               # Documentación del proyecto
```

---

## 🛠️ Tecnologías utilizadas

* **HTML** – Estructura semántica de la interfaz.
* **CSS** – Estilos, animaciones (`@keyframes`), gradientes y diseño responsive.
* **JavaScript** – Clases, `async/await`, `fetch`, `filter()`, `reduce()`, template literals.
* **SweetAlert2** – Librería externa para alertas visuales modernas.
* **LocalStorage** – Persistencia de datos en el navegador.

---

## 👨‍💻 Autor

**Franco Fajardo**
