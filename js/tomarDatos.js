function datosClienteDOM() {
    const formulario = document.getElementById("formulario-registro")
    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const dni = document.getElementById('dni').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;

        console.log('Datos del cliente:', nombre, apellido, dni, email, telefono);
        // poenr logica de la api para guadar datos en la base de datos
    })
}
export default datosClienteDOM