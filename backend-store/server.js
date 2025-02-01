import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./Models/userModel.js";
import cors from "cors";

dotenv.config(); // Cargar las variables de entorno

const app = express();

app.use(cors());
app.use(express.json()); // Middleware para parsear JSON

// Conexión a MongoDB
const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      console.error("Error: La variable MONGODB_URI no está definida.");
      process.exit(1);
    }
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conexión a MongoDB exitosa");
  } catch (err) {
    console.error("Error al conectar con MongoDB:", err.message);
    process.exit(1);
  }
};

// Ruta GET para obtener todos los usuarios
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();

    if (users.length === 0) {
      return res.status(404).json({ message: "No se encontraron usuarios." });
    }

    res.status(200).json(users);
  } catch (err) {
    console.error("Error al obtener los usuarios:", err.message);
    res.status(500).json({ message: "Hubo un error al obtener los usuarios." });
  }
});

// Ruta POST para crear un usuario
app.post("/api/users", async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  // Verificar que las contraseñas coincidan
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Las contraseñas no coinciden." });
  }

  try {
    // Verificar si el correo electrónico o el nombre de usuario ya existen
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({
        message:
          "El correo electrónico o el nombre de usuario ya están en uso.",
      });
    }

    // Crear un nuevo usuario
    const newUser = new User({
      username,
      email,
      password,
      confirmPassword,
    });

    // Guardar el nuevo usuario en la base de datos
    await newUser.save();

    // Enviar respuesta exitosa
    res.status(201).json({
      message: "Usuario creado exitosamente",
      user: {
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error("Error al crear el usuario:", err.message);
    res.status(500).json({ message: "Hubo un error al crear el usuario." });
  }
});

// Conectar a la base de datos
connectDB();

// Configurar el puerto desde la variable de entorno o usar 5000 por defecto
const PORT = process.env.PORT || 5000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
