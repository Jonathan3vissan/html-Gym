// Función para mostrar contenido al cambiar entre secciones
function mostrarContenido(seccion) {
    const secciones = document.querySelectorAll('.seccion-contenido');
    secciones.forEach(seccion => seccion.style.display = 'none');

    const seccionMostrar = document.getElementById(seccion);
    if (seccionMostrar) {
        seccionMostrar.style.display = 'block';
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
