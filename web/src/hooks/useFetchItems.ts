import { useEffect, useState } from "react";
import { getItems } from "../helpers/from_api/getItems";
import type { ItemData } from "../models/ItemData";

/**
 * Hook personalizado para obtener items desde la API.
 * @returns Un objeto que contiene los items obtenidos de la API y un estado de carga.
 */
export const useFetchItems = () => {
  const [items, setItems] = useState<ItemData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const fetchItems = async () => {
    const newItems = await getItems();
    setItems(newItems);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchItems();
  }, []);
  return { items, isLoading };
}