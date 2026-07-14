import { useState } from "react";
import { API_URL } from "../../config";

function useLoginUser() {
  const [error, setError] = useState(null);

  const loginUser = async (email, password) => {
    setError(null);

    try {
      const response = await fetch(`${API_URL}user`);

      if (!response.ok) {
        throw new Error(`Error al leer usuarios: ${response.status}`);
      }

      const users = await response.json();

      // En un backend real existiría un endpoint específico de login.
      // Con json-server buscamos el usuario dentro de la colección.
      const userFound = users.find(
        (user) =>
          user.email === email &&
          user.password === password &&
          !user.deletedAt
      );

      if (!userFound) {
        setError("Credenciales incorrectas");
        return null;
      }

      // No devolvemos la contraseña por seguridad.
      const { password: _, ...userWithoutPassword } = userFound;

      return userWithoutPassword;
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError(error);
      return null;
    }
  };

  return {
    error,
    loginUser,
  };
}

export default useLoginUser;