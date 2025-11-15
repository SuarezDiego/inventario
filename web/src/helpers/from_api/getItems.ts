import { API_URL } from "../../config";
import type { ItemData } from "../../models/ItemData";

/**
 * Obtiene una lista de items desde la API.
 * @returns Una lista de items obtenida desde la API.
 */
export const getItems = async (): Promise<ItemData[]> => {
  try {
    if (!API_URL) {
      throw new Error("La variable de entorno VITE_API_URL no está definida.");
    }

    const url = `${API_URL}/items/`.trim();
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error al obtener los items: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("La respuesta de la API no es una lista válida de items.");
    }

    return data;
  } catch (error) {
    console.error("Error en getItems:", error);
    return [];
  }
};
