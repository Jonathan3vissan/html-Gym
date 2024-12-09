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

// Función para mostrar la tarjeta del cliente con todos los datos
function mostrarTarjetaCliente(cliente) {
    // Seleccionamos el contenedor de la tarjeta
    const contenedorTarjeta = document.getElementById("clienteEncontrado");

    // Asignamos los datos a los elementos dentro de la tarjeta
    const nombreElemento = document.getElementById("nombreCliente");
    const apellidoElemento = document.getElementById("apellidoCliente");
    const dniElemento = document.getElementById("dniCliente");
    const telefonoElemento = document.getElementById("telefonoCliente");
    const emailElemento = document.getElementById("emailCliente");
    const direccionElemento = document.getElementById("direccionCliente");

    nombreElemento.textContent = `Nombre: ${cliente.Nombre}`;
    apellidoElemento.textContent = `Apellido: ${cliente.Apellido}`;
    dniElemento.textContent = `DNI: ${cliente.DNI}`;
    telefonoElemento.textContent = `Teléfono: ${cliente.Telefono}`;
    emailElemento.textContent = `Email: ${cliente.Mail}`;

    // Hacemos visible la tarjeta
    contenedorTarjeta.style.display = "block";

    // Ocultamos otras secciones
    document.getElementById("membresias").style.display = "none";
    document.getElementById("registrarCliente").style.display = "none";
    document.getElementById("inventario").style.display = "none";
}

// Función para cerrar la tarjeta y volver a mostrar las secciones
function cerrarTarjeta() {
    document.getElementById("clienteEncontrado").style.display = "none";
    document.getElementById("membresias").style.display = "block";
    document.getElementById("registrarCliente").style.display = "block";
    document.getElementById("inventario").style.display = "block";
}

// Llamamos a la función para que la búsqueda esté lista cuando la página se haya cargado
document.addEventListener("DOMContentLoaded", buscarPorDNI);
