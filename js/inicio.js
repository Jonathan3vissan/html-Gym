/**
 * Muestra el contenido de la sección seleccionada
 * @param {string} seccion - El ID de la sección a mostrar.
 */
function mostrarContenido(seccion) {
    // Primero ocultar todas las secciones
    const secciones = document.querySelectorAll('.content-section');
    secciones.forEach(seccion => seccion.style.display = 'none');

    // Mostrar la sección seleccionada
    const seccionAMostrar = document.getElementById(seccion);
    if (seccionAMostrar) {
        seccionAMostrar.style.display = 'block';
    }
}

/**
 * Cierra la sesión del usuario
 */
function cerrarSesion() {
    if (confirm("¿Estás seguro de que deseas cerrar sesión?")) {
        // Aquí puedes agregar la lógica para cerrar sesión
        alert("Has cerrado sesión.");
        // Redirigir a la página de login o hacer la lógica que necesites.
        // location.href = 'login.html'; // Ejemplo de redirección
    }
}
