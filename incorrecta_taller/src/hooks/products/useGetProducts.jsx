import { useEffect, useState } from "react";
import { API_URL } from "../../config.js";

function useGetProducts() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_URL}products`);

      if (!response.ok) {
        throw new Error(
          `Error ${response.status}: no se pudieron obtener los productos`
        );
      }

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
      setError(error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return {
    products,
    error,
    loading,
    refetch: getProducts,
  };
}

export default useGetProducts;