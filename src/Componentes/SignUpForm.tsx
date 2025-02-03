import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Input from './Input.tsx';  
import Button from './Button.tsx';

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Errors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

const SignUpForm = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Manejador para cambios en el input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validación de los campos
  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    if (!formData.username) newErrors.username = 'El nombre de usuario es requerido';
    if (!formData.email) newErrors.email = 'El correo electrónico es requerido';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'El correo electrónico no es válido';
    if (!formData.password) newErrors.password = 'La contraseña es requerida';
    else if (formData.password.length < 6) newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejo del envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);

      const newUser = {
        username: formData.username,
        email: formData.email,
        password: formData.password, // Solo enviamos la contraseña
      };

      try {
        const response = await fetch('http://localhost:7000/api/users', {  
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser),
        });

        const data = await response.json();

        if (response.ok) {
          setIsLoading(false);
          setIsSubmitted(true);
        } else {
          setIsLoading(false);
          setErrors({ general: data.message });
        }
      } catch (error) {
        setIsLoading(false);
        setErrors({ general: 'Hubo un error al procesar la solicitud.' });
      }
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center p-6 bg-green-100 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-green-800 mb-4">¡Registro exitoso!</h2>
        <p className="text-green-700">Gracias por unirte a nuestra red social. Revisa tu correo electrónico para verificar tu cuenta.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Regístrate</h2>
      {errors.general && (
        <div className="mb-4 text-red-500 text-center">
          {errors.general}
        </div>
      )}
      <Input
        label="Nombre de usuario"
        id="username"
        name="username"
        type="text"
        placeholder="Ingresa tu nombre de usuario"
        value={formData.username}
        onChange={handleChange}
        error={errors.username}
        required
      />
      <Input
        label="Correo electrónico"
        id="email"
        name="email"
        type="email"
        placeholder="Ingresa tu correo electrónico"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
      />
      <Input
        label="Contraseña"
        id="password"
        name="password"
        type="password"
        placeholder="Ingresa tu contraseña"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        required
      />
      <Input
        label="Confirmar contraseña"
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        placeholder="Confirma tu contraseña"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        required
      />

      <div className="mb-6">
        <Button type="submit" isLoading={isLoading}>
          {isLoading ? 'Registrando...' : 'Registrarse'}
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;
