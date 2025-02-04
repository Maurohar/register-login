import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendVerificationEmail = async (email, token, callback) => {
  const verificationUrl = `http://localhost:7000/auth/verify-email?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verificación de Correo Electrónico",
    text: `Para verificar tu correo electrónico, haz clic en el siguiente enlace: ${verificationUrl}`,
    html: `<p>Para verificar tu correo electrónico, haz clic en el siguiente enlace: <a href="${verificationUrl}">Verificar correo</a></p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Correo de verificación enviado");
    callback(null, "Correo de verificación enviado exitosamente");
  } catch (error) {
    console.error("Error al enviar el correo:", error);

    callback(error, null);
  }
};

export default { sendVerificationEmail };
