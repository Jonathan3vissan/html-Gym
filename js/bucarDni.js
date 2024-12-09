async function buscarPorDNI() {
    const botonLupaBuscar = document.getElementById("icono-lupa");
    botonLupaBuscar.addEventListener("click", async function (event) {
        event.preventDefault();  // Evitar que se recargue la página
        const dni = document.getElementById("barra-buscador").value.trim(); // Usamos .value y .trim() para eliminar espacios extras
        if (dni === "") {
            alert("Por favor ingresa un DNI válido");
            return;
        }
        try {
            const enviarBusqueda = await fetch(`http://localhost:3000/api/buscarDni/${dni}`);
            if (enviarBusqueda.ok) {
                const cliente = await enviarBusqueda.json();

                mostrarTarjetaCliente(cliente);
            } else {
                alert("No fue posible encontrar el cliente");
            }
        } catch (error) {
            console.error("Error al realizar la búsqueda:", error);
            alert("Hubo un error al intentar realizar la búsqueda");
        }
    });
}

// Función para mostrar la tarjeta del cliente
function mostrarTarjetaCliente(cliente) {
    // Seleccionamos el contenedor de la tarjeta
    const contenedorTarjeta = document.getElementById("clienteEncontrado");

    // Asignamos los datos a los elementos dentro de la tarjeta
    const nombreElemento = document.getElementById("nombreCliente");
    const apellidoElemento = document.getElementById("apellidoCliente");
    const dniElemento = document.getElementById("dniCliente");

    nombreElemento.textContent = `Nombre: ${cliente.Nombre}`;
    apellidoElemento.textContent = `Apellido: ${cliente.Apellido}`;
    dniElemento.textContent = `DNI: ${cliente.DNI}`;

    // Hacemos visible la tarjeta
    contenedorTarjeta.style.display = "block";

    // Ocultamos las otras secciones
    const secciones = document.querySelectorAll('.seccion-contenido');
    secciones.forEach(seccion => {
        seccion.style.display = 'none';
    });
}

// Función para cerrar la tarjeta
function cerrarTarjeta() {
    // Ocultamos la tarjeta
    const contenedorTarjeta = document.getElementById("clienteEncontrado");
    contenedorTarjeta.style.display = "none";

    // Volvemos a mostrar las secciones ocultas
    const secciones = document.querySelectorAll('.seccion-contenido');
    secciones.forEach(seccion => {
        seccion.style.display = 'block';
    });
}

// Llamamos a la función para que la búsqueda esté lista cuando la página se haya cargado
document.addEventListener("DOMContentLoaded", buscarPorDNI);
