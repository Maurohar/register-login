/* import User from "../Models/userModel.js";
import bcrypt from "bcryptjs";

const userService = {
  // Validación de contraseñas
  async validatePasswords(password, confirmPassword) {
    if (password !== confirmPassword) {
      throw new Error("Las contraseñas no coinciden.");
    }
  },

  // Verificar si el correo o el nombre de usuario ya están en uso
  async checkExistingUser(email, username) {
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      throw new Error(
        "El correo electrónico o el nombre de usuario ya están en uso."
      );
    }
  },

  // Crear un nuevo usuario con la contraseña encriptada
  async createUser(username, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
     return newUser;
  },
};

export default userService;
 */
