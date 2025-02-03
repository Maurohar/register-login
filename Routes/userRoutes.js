import express from "express";
import userController from "../Controller/userController.js"; // Importar el controlador de usuarios

const router = express.Router();

// Ruta para obtener todos los usuarios
router.get("/api/users", userController.getUsers);

// Ruta para crear un nuevo usuario
router.post("/api/users", userController.createUser);

export default router; // Exporta el enrutador
