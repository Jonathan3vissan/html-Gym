/* // rutas/rutasUsuario.js

import express from 'express';
// Asegúrate de que esta importación sea correcta:
import { iniciarSesion } from '../controladores/controladorAdmin.js'; // Correcta importación
import controlRutas from '../controladores/controladorUsuario.js'; // Controlador de usuarios
import { verificarToken } from '../middleware/verificarToken.js'; // Middleware para verificar el token

const rutas = express.Router();

// Ruta para crear un usuario (NO está protegida por JWT)
rutas.post('/usuarios', controlRutas.crearUsuario);

// Ruta para obtener todos los usuarios (Requiere JWT)
rutas.get('/usuarios', verificarToken, controlRutas.obtenerUsuario);

// Ruta para obtener un usuario por ID (Requiere JWT)
rutas.get('/usuarios/:id', verificarToken, controlRutas.obtenerUsuarioPorId);

// Ruta para actualizar un usuario (Requiere JWT)
rutas.put('/usuarios/:id', verificarToken, controlRutas.actualizarUsuario);

// Ruta para eliminar un usuario (Requiere JWT)
rutas.delete('/usuarios/:id', verificarToken, controlRutas.eliminarUsuario);

// Ruta para verificar si un administrador está autenticado (NO está protegida por JWT)
rutas.post('/acceso', controlRutas.verificarAdmin);

// **Ruta para iniciar sesión y obtener un token JWT (NO está protegida por JWT)**
// Asegúrate de que aquí estamos usando la función `iniciarSesion` correctamente:
rutas.post('/login', iniciarSesion);  // Correcta importación

export default rutas;
 */