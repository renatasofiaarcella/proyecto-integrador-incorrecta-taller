import { useState } from "react";
import { API_URL } from "../../config";

function usePostProduct() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const postProduct = async (formData) => {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(
          `Error al crear el producto: ${response.status}`
        );
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Error al crear un nuevo producto:", error);
      setError(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    error,
    loading,
    postProduct,
  };
}

export default usePostProduct;