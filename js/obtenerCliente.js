/**
 * Función para mostrar contenido al cambiar entre secciones
 * @param {Object} seccion 
 */
function mostrarContenido(seccion) {
    const secciones = document.querySelectorAll('.seccion-contenido');
    secciones.forEach(seccion => seccion.style.display = 'none');
    const seccionMostrar = document.getElementById(seccion);
    if (seccionMostrar) {
        seccionMostrar.style.display = 'block';
    }
    if (seccion === 'registrarCliente') {
        mostrarFormularioRegistro();  
    }
}
/**
 * Muestra el formulario de registro para el cliente
 */
function mostrarFormularioRegistro() {
    const registrarClienteSeccion = document.getElementById('registrarCliente');
    registrarClienteSeccion.innerHTML = '<h2>Registrar Cliente</h2><p>Aquí puedes registrar un nuevo cliente en el sistema.</p>';
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

    registrarClienteSeccion.innerHTML += formularioHTML;
    document.getElementById('formularioRegistroCliente').addEventListener('submit', registrarCliente);
}
/**
 * Función para registrar al cliente
 */
async function registrarCliente(event) {
    event.preventDefault();  

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const dni = document.getElementById('dni').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;

    const datosCliente = {
        nombre: nombre,
        apellido: apellido,
        dni: dni,
        mail: email,
        telefono: telefono
    };

    try {
        const respuesta = await fetch('http://localhost:3000/api/usuarios', {
            method: 'POST',  
            headers: {
                'Content-Type': 'application/json'  
            },
            body: JSON.stringify(datosCliente)  
        });

        if (respuesta.ok) {
            const data = await respuesta.json();  
            alert(`Cliente creado con  éxito em el archivo obtnere cliente. ID: ${data.id}`);  
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

            const tabla = document.createElement('table');
            tabla.classList.add('tabla-clientes'); 

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

            tabla.appendChild(cuerpo);

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

document.addEventListener('DOMContentLoaded', () => {
    const btnMostrarMembresias = document.getElementById('btnMostrarMembresias');
    if (btnMostrarMembresias) {
        btnMostrarMembresias.addEventListener('click', () => {
            mostrarContenido('membresias');
            obtenerClientes();
        });
    }

    const btnRegistrarCliente = document.getElementById('btnRegistrarCliente');
    if (btnRegistrarCliente) {
        btnRegistrarCliente.addEventListener('click', () => mostrarContenido('registrarCliente'));
    }

    const btnInventario = document.getElementById('btnInventario');
    if (btnInventario) {
        btnInventario.addEventListener('click', () => mostrarContenido('inventario'));
    }
});
