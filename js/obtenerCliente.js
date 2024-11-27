// Función para mostrar contenido al cambiar entre secciones
function mostrarContenido(seccion) {
    const secciones = document.querySelectorAll('.seccion-contenido');
    secciones.forEach(seccion => seccion.style.display = 'none');

    const seccionMostrar = document.getElementById(seccion);
    if (seccionMostrar) {
        seccionMostrar.style.display = 'block';
    }

    // Si se selecciona la sección 'registrarCliente', mostrar el formulario
    if (seccion === 'registrarCliente') {
        mostrarFormularioRegistro();  // Mostrar el formulario de registro
    }
}

/**
 * Muestra el formulario de registro para el cliente
 */
function mostrarFormularioRegistro() {
    const registrarClienteSeccion = document.getElementById('registrarCliente');
    
    // Limpiar la sección antes de agregar el formulario
    registrarClienteSeccion.innerHTML = '<h2>Registrar Cliente</h2><p>Aquí puedes registrar un nuevo cliente en el sistema.</p>';
    
    // Crear el formulario para el registro del cliente
    const formularioHTML = `
        <form id="formularioRegistroCliente">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required><br><br>
            
            <label for="apellido">Apellido:</label>
            <input type="text" id="apellido" name="apellido" required><br><br>
    
            <label for="dni">DNI:</label>
            <input type="text" id="dni" name="dni" required><br><br>
    
            <label for="email">Correo Electrónico:</label>
            <input type="email" id="email" name="email" required><br><br>
    
            <label for="telefono">Teléfono:</label>
            <input type="text" id="telefono" name="telefono" required><br><br>
    
            <button type="submit">Registrar Cliente</button>
        </form>
    `;

    // Insertar el formulario en la sección correspondiente
    registrarClienteSeccion.innerHTML += formularioHTML;

    // Asociar el evento 'submit' del formulario con la función que manejará el registro
    document.getElementById('formularioRegistroCliente').addEventListener('submit', registrarCliente);
}

/**
 * Función para registrar al cliente
 */
async function registrarCliente(event) {
    event.preventDefault();  // Evita que el formulario se envíe de manera tradicional

    // Tomar los datos del formulario
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const dni = document.getElementById('dni').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;

    // Crear un objeto con los datos del cliente
    const datosCliente = {
        nombre: nombre,
        apellido: apellido,
        dni: dni,
        mail: email,
        telefono: telefono
    };

    try {
        // Enviar los datos al servidor usando fetch (POST)
        const respuesta = await fetch('http://localhost:3000/api/usuarios', {
            method: 'POST',  // El método de la solicitud es POST
            headers: {
                'Content-Type': 'application/json'  // El cuerpo de la solicitud está en formato JSON
            },
            body: JSON.stringify(datosCliente)  // Convertimos el objeto JavaScript en JSON
        });

        if (respuesta.ok) {
            const data = await respuesta.json();  // Obtener la respuesta como JSON
            alert(`Cliente creado con éxito. ID: ${data.id}`);  // Mostrar mensaje de éxito

            // Limpiar el formulario después de registrar al cliente
            document.getElementById('formularioRegistroCliente').reset();
        } else {
            const errorData = await respuesta.json();
            alert(`Error al registrar el cliente: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        alert('Hubo un problema al registrar el cliente. Intenta más tarde.');
    }
}

/**
 * obtiene los clientes registrados
 */
async function obtenerClientes() {
    try {
        const respuesta = await fetch('http://localhost:3000/api/usuarios');
        if (respuesta.ok) {
            const clientes = await respuesta.json();
            const membresiasSeccion = document.getElementById('membresias');
            membresiasSeccion.innerHTML = '<h2>Clientes Registrados</h2><p>Aquí puedes ver los datos de los clientes.</p>';

            // Crear la tabla
            const tabla = document.createElement('table');
            tabla.classList.add('tabla-clientes'); // Añadir una clase para estilo (opcional)

            // Crear el encabezado de la tabla
            const encabezado = document.createElement('thead');
            const filaEncabezado = document.createElement('tr');
            filaEncabezado.innerHTML = `
                <th>Nombre</th>
                <th>Apellido</th>
                <th>DNI</th>
                <th>Correo</th>
                <th>Teléfono</th>
            `;
            encabezado.appendChild(filaEncabezado);
            tabla.appendChild(encabezado);

            // Crear el cuerpo de la tabla
            const cuerpo = document.createElement('tbody');
            clientes.forEach(cliente => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${cliente.Nombre}</td>
                    <td>${cliente.Apellido}</td>
                    <td>${cliente.DNI}</td>
                    <td>${cliente.Mail}</td>
                    <td>${cliente.Telefono}</td>
                `;
                cuerpo.appendChild(fila);
            });

            // Añadir el cuerpo de la tabla a la tabla
            tabla.appendChild(cuerpo);

            // Añadir la tabla de clientes a la sección de Membresías
            membresiasSeccion.appendChild(tabla);
        } else {
            console.error('Error al obtener los clientes:', respuesta.statusText);
            alert('No se pudieron cargar los clientes. Intenta más tarde.');
        }
    } catch (error) {
        console.error('Error de red:', error);
        alert('Hubo un problema al conectar con el servidor.');
    }
}

// Asignar los eventos de los botones dentro del archivo JS
document.addEventListener('DOMContentLoaded', () => {
    // Event listener para mostrar la sección de Membresías
    const btnMostrarMembresias = document.getElementById('btnMostrarMembresias');
    if (btnMostrarMembresias) {
        btnMostrarMembresias.addEventListener('click', () => {
            mostrarContenido('membresias');
            obtenerClientes();  // Llamar a la función para cargar los datos de clientes
        });
    }

    // Event listener para mostrar la sección de Registrar Cliente
    const btnRegistrarCliente = document.getElementById('btnRegistrarCliente');
    if (btnRegistrarCliente) {
        btnRegistrarCliente.addEventListener('click', () => mostrarContenido('registrarCliente'));
    }

    // Event listener para mostrar la sección de Inventario
    const btnInventario = document.getElementById('btnInventario');
    if (btnInventario) {
        btnInventario.addEventListener('click', () => mostrarContenido('inventario'));
    }
});
