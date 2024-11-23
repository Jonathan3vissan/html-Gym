async function datosClienteDOM() {
    const formulario = document.getElementById("formulario-registro");

    formulario.addEventListener('submit', async (evento) => {
        evento.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const dni = document.getElementById('dni').value;
        const email = document.getElementById('mail').value;
        const telefono = document.getElementById('telefono').value;

        const datosCliente = {
            nombre: nombre,
            apellido: apellido,
            dni: dni,
            mail: email,
            telefono: telefono

        };
        console.log("cliente", datosCliente,"y tipo de dato :",typeof datosCliente);

        try {
            // Enviar los datos del cliente a la API
            const response = await fetch('http://localhost:3000/api/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datosCliente),
            });

            // Verificamos si la respuesta fue exitosa
            if (response.ok) {
                // Si la respuesta es exitosa, mostrar mensaje de éxito
                const data = await response.json();
                alert(`Cliente registrado con éxito. ID: ${data.id}`);
                // Opcional: puedes redirigir al usuario a otra página o limpiar el formulario
                formulario.reset();  // Limpiar formulario
            } else {
                // Si la respuesta no es exitosa, mostrar mensaje de error
                const errorData = await response.json();
                alert(`Hubo un error al registrar el cliente: ${errorData.message}`);
            }
        } catch (error) {
            // Capturamos cualquier error y lo mostramos
            console.error("Error al registrar el cliente:", error);
            alert("Hubo un error al registrar el cliente. Intenta nuevamente.");
        }
    });
}

export default datosClienteDOM;
