import bcrypt from "bcryptjs"; // Asegúrate de que bcrypt esté importado
import User from "../Models/userModel.js"; // Asegúrate de tener el modelo de usuario correctamente importado
import mailerService from "../Services/mailerService.js"; // Importa el servicio de email

const userController = {
  async getUsers(req, res) {
    try {
      const users = await User.find(); // Obtiene todos los usuarios de la base de datos
      return res.status(200).json({ users }); // Retorna la lista de usuarios
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      return res
        .status(500)
        .json({ message: "Hubo un error al obtener los usuarios." });
    }
  },

  // Método para crear un nuevo usuario
  async createUser(req, res) {
    const { username, email, password } = req.body;

    // Verificar si el correo o el nombre de usuario ya existen
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({
        message: "El correo o el nombre de usuario ya están en uso.",
      });
    }
    try {
      // Encriptar la contraseña utilizando bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crear el nuevo usuario con la contraseña encriptada
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        isVerified: false, // Al principio, el usuario no está verificado
      });

      // Guardar el nuevo usuario en la base de datos

      await newUser.save();

      //envia email cuando se crea un usuario.
      await mailerService.sendVerificationEmail(newUser.email, newUser._id);

      return res.status(201).json({
        message: "Usuario creado exitosamente, porfavor verifica tu correo.",
        user: { username: newUser.username, email: newUser.email },
      });
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      return res
        .status(500)
        .json({ message: "Hubo un error al crear el usuario." });
    }
  },
};

export default userController;
