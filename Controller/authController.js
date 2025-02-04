import jwt from "jsonwebtoken";
import authService from "../Services/authService.js"; // Importa el servicio de autenticación

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    // Verifica el token JWT y decodifica
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId; // Obtiene el ID del usuario desde el token

    // Llama al servicio de autenticación para verificar el correo
    const user = await authService.verifyEmail(userId);

    // Si la verificación es exitosa, responde con el mensaje y el usuario
    res.status(200).json({ message: "Usuario verificado exitosamente", user });
  } catch (error) {
    // Si ocurre un error (por ejemplo, si el token es inválido o el usuario no existe), responde con error
    res.status(400).send({
      message: "Error al verificar el correo electrónico del usuario",
      error: error.message,
    });
  }
};

export default { verifyEmail };
