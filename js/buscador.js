function crearBuscadorDNI() {
    // Crear el formulario
    const formularioBuscarDni = document.createElement("form");
    formularioBuscarDni.setAttribute("id", "Buscador-Dni");
    formularioBuscarDni.setAttribute("method", "GET");

    // Crear el input para el DNI
    const inputDni = document.createElement("input");
    inputDni.setAttribute("type", "number");
    inputDni.setAttribute("name", "dni");
    inputDni.setAttribute("placeholder", "Ingrese DNI del cliente");
    inputDni.setAttribute("required", true); // Hacer que el campo sea obligatorio

    // Crear el botón de búsqueda
    const btnEnviarBusqueda = document.createElement("button");
    btnEnviarBusqueda.setAttribute("type", "button"); // Especificamos que es un botón normal
    btnEnviarBusqueda.textContent = "Buscar Cliente"; // Texto del botón
    btnEnviarBusqueda.addEventListener("click", function() {
        const dni = inputDni.value; // Obtener el valor del DNI ingresado
        if (dni) {
            buscarPorDni(dni); // Llamamos a la función de búsqueda
        } else {
            alert("Por favor ingresa un DNI.");
        }
    });

    // Crear el botón de cancelar
    const btnCancelarBusqueda = document.createElement("button");
    btnCancelarBusqueda.setAttribute("type", "button"); // Especificamos que es un botón normal
    btnCancelarBusqueda.textContent = "Cancelar"; // Texto del botón
    btnCancelarBusqueda.addEventListener("click", function() {
        inputDni.value = ""; // Limpiar el campo de entrada
        console.log("Búsqueda cancelada");
    });

    // Añadir los elementos al formulario
    formularioBuscarDni.appendChild(inputDni);
    formularioBuscarDni.appendChild(btnEnviarBusqueda);
    formularioBuscarDni.appendChild(btnCancelarBusqueda);

    // Limpiar el contenedor donde se mostrará el formulario y añadirlo al DOM
    const contenedorFormulario = document.getElementById("formulario-actualizar"); // Aquí va el contenedor de tu formulario
    contenedorFormulario.innerHTML = ""; // Limpiar cualquier contenido previo
    contenedorFormulario.appendChild(formularioBuscarDni);
}

// Función que realiza la búsqueda en la API
function buscarPorDni(dni) {
    // Verificamos si el DNI es válido
    console.log("dni ingresado:", dni, "tipo de dato DNI tomado del DOM:", typeof dni);
    
    if (!dni || isNaN(dni)) {
        alert("Por favor ingresa un número de DNI válido.");
        return;
    }

    console.log("dni:", dni, "tipo de dato:", typeof dni);

    // Aseguramos que el DNI sea un número
    dni = Number(dni);

    console.log("Intentamos cambiar a número DNI:", dni, "tipo de dato:", typeof dni);

    // Realizar la solicitud a la API con el DNI
    fetch(`http://localhost:3000/api/buscarDni/${dni}`) // Corregido para que la URL esté bien formada
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert("No se encontraron resultados para este DNI.");
            } else {
                // Mostrar los resultados (esto puede variar dependiendo de la respuesta de la API)
                console.log("Resultado:", data);
                alert(`Cliente encontrado: ${data.Nombre} ${data.Apellido}`);
            }
        })
        .catch(error => {
            console.error("Error al hacer la búsqueda en la API:", error);
            alert("Hubo un error en la búsqueda. Intenta nuevamente.");
        });
}

// Asignar el evento de click al botón de "Buscar Clientes"
document.getElementById("btnBuscarPorDni").addEventListener("click", function() {
    crearBuscadorDNI(); // Crear el formulario cuando se hace clic
});

export default crearBuscadorDNI;
