/* // middlewares/verificarToken.js
import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Obtener el token del header

  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso denegado, no hay token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verificar el token
    req.usuario = decoded;  // Guardar el usuario decodificado en la solicitud
    next();  // Continuar con la solicitud
  } catch (error) {
    return res.status(401).json({ mensaje: 'Token no válido' });
  }
};

//este va dentro de middleware */