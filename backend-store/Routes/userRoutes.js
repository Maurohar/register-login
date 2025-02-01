/* import express from "express";
import User from "../Models/userModel.js";

const router = express.Router();

router.post("/api/users", async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    // Validar si todos los campos están presentes
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    // Crear un nuevo usuario
    const newUser = new User({
      username,
      email,
      password,
      confirmPassword,
    });

    // Guardar el usuario en la base de datos
    await newUser.save();

    return res
      .status(201)
      .json({ message: "Usuario creado exitosamente", user: newUser });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Hubo un error al guardar el usuario" });
  }
});
 */
