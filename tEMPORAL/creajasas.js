/* // Crear un archivo para generar el hash de la contraseña
import bcrypt from 'bcryptjs';  // Importación correcta

// Cambia esto por la contraseña que quieras cifrar
const password = 'alondra';

// Generar el hash de la contraseña
bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Hash generado: ', hash);  // Este es el hash que debes copiar e insertar en la base de datos
  }
});
 */