/* document.querySelector('form').addEventListener('submit', async function (e) {
    e.preventDefault();  // Evita que el formulario se envíe de forma convencional

    const usuario = document.getElementById('usuario').value;
    const contrasena = document.getElementById('contrasena').value;

    try {
        const respuesta = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ usuario, contrasena })
        });

        const data = await respuesta.json();

        if (respuesta.ok) {
            alert(data.mensaje);
            localStorage.setItem('token', data.token);  // Guarda el token en localStorage
            window.location.href = './dashboard.html';  // Redirige al dashboard
        } else {
            alert(data.mensaje);  // Muestra un error
        }
    } catch (error) {
        console.error(error);
        alert('Hubo un error al intentar iniciar sesión');
    }
});
 */