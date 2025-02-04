import express from "express";
import userController from "../Controller/userController.js";
import mailerService from "../Services/mailerService.js"; // Importar el controlador de usuarios

const router = express.Router();

// Ruta GET para obtener todos los usuarios
router.get("/api/users", userController.getUsers);
router.get("/auth/verify-email", mailerService.sendVerificationEmail);

// Ruta POST para crear un nuevo usuarios.
router.post("/api/users", userController.createUser);

export default router; // Exporta de forma global el enrutador.
