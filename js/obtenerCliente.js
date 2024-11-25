// Función para mostrar contenido al cambiar entre secciones
function mostrarContenido(seccion) {
    // Ocultar todas las secciones
    const secciones = document.querySelectorAll('.seccion-contenido');
    secciones.forEach(seccion => seccion.style.display = 'none');

    // Mostrar la sección seleccionada
    const seccionMostrar = document.getElementById(seccion);
    if (seccionMostrar) {
        seccionMostrar.style.display = 'block';
    }
}

// Función para obtener los datos de los clientes desde la API
async function obtenerClientes() {
    try {
        // Hacer la solicitud a la API
        const respuesta = await fetch('http://localhost:3000/api/usuarios');
        
        if (respuesta.ok) {
            const clientes = await respuesta.json();

            // Mostrar los datos de los clientes en la sección de Membresías
            const membresiasSeccion = document.getElementById('membresias');
            membresiasSeccion.innerHTML = '<h2>Membresías</h2><p>Aquí puedes ver las diferentes opciones de membresías disponibles.</p>';
            
            // Crear una lista de los clientes
            const listaClientes = document.createElement('ul');
            clientes.forEach(cliente => {
                const clienteElemento = document.createElement('li');
                clienteElemento.textContent = `${cliente.Nombre} ${cliente.Apellido} - ${cliente.Mail}`;
                listaClientes.appendChild(clienteElemento);
            });

            // Añadir la lista de clientes a la sección de Membresías
            membresiasSeccion.appendChild(listaClientes);
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
