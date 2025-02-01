import mongoose from "mongoose";

// Definir el esquema para el usuario
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Por favor ingresa un nombre de usuario."],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Por favor ingresa un correo electrónico."],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Por favor ingresa una contraseña."],
      minlength: [6, "La contraseña debe tener al menos 6 caracteres."],
    },
    confirmPassword: {
      type: String,
      required: [true, "Por favor confirma tu contraseña."],
    },
  },
  {
    timestamps: true,
  }
);

// Crear el modelo de Mongoose con la colección "user"
const User = mongoose.model("User", userSchema, "user"); // Asegúrate de que "user" es el nombre correcto de la colección

export default User;
