/* import pool from '../configuracion/configuracionDB.js'; // Base de datos
import bcrypt from 'bcryptjs'; // Para cifrado y comparación de contraseñas
import jwt from 'jsonwebtoken'; // Para generar el token JWT

const controladorAdmin = {
    // Iniciar sesión (autenticación con JWT)
    iniciarSesion: async (req, res) => {
        const { usuario, contrasena } = req.body;

        if (!usuario || !contrasena) {
            return res.status(400).json({ mensaje: 'Usuario y contraseña son requeridos' });
        }

        try {
            // Buscar al administrador en la base de datos
            const [rows] = await pool.query('SELECT * FROM administrador WHERE usuario = ?', [usuario]);

            if (rows.length === 0) {
                return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
            }

            // Verificar la contraseña cifrada
            const esValido = await bcrypt.compare(contrasena, rows[0].contrasena);

            if (!esValido) {
                return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
            }

            // Generar el token JWT
            const token = jwt.sign(
                { id: rows[0].id, usuario: rows[0].usuario },
                process.env.JWT_SECRET,  // Clave secreta desde el archivo .env
                { expiresIn: '8h' }  // El token expirará en 8 hora
            );

            // Devolver el token al cliente
            res.status(200).json({ mensaje: 'Inicio de sesión exitoso', token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensaje: 'Error al iniciar sesión' });
        }
    }
};

export default controladorAdmin;
 */