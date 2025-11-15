import { API_URL } from "../../config";
import type { ItemData } from "../../models/ItemData";
import { checkAPI } from "../utils/checkAPI";

/**
 * Añade un nuevo item a la API.
 * @returns El item añadido.
 */
export const addItem = async (itemData: ItemData): Promise<ItemData | null> => {
  try {
    checkAPI();
    const url = `${API_URL}/items/`.trim();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(itemData)
    });

    if (!response.ok) {
      throw new Error(`Error al crear el item: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error en addItem:", error);
    return null;
  }
};