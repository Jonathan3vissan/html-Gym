async function nuevoCliente() {

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const dni = document.getElementById('dni').value;
    const email = document.getElementById('mail').value;
    const telefono = document.getElementById('telefono').value;


    const datosClienteNuevo = {
        Nombre: nombre,
        Apellido: apellido,
        DNI: dni,
        Mail: email,
        Telefono: telefono
    }

    try {
        const respuestaDelServidor = await fetch('http://localhost:3000/api/usuarios', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosClienteNuevo)
        })
        if (respuestaDelServidor.ok) {
            const datos = await respuestaDelServidor.json();
            alert(`Usuario creado con éxito. ID: ${datos.id}`);
            document.getElementById("formulario-registro")
        } else {
            const errorData = await respuesta.json();
            alert(`Error al registrar el usuario: ${errorData.message}`);

        }

    } catch (error) {
        console.error("error obtenido:", error)
    }

}