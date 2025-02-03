import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

import userRouter from "./Routes/userRoutes.js";

dotenv.config(); // Cargar las variables de entorno

const app = express();

// Middleware
app.use(cors());

app.use(express.json()); // Middleware para parsear JSON
app.use(bodyParser.json());

// Usar el enrutador de usuarios (directamente `userRouter` sin `userService`)
app.use(userRouter);

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

// Conectar a la base de datos
connectDB();

// Configurar el puerto desde la variable de entorno o usar 5000 por defecto
const PORT = process.env.PORT || 5000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
