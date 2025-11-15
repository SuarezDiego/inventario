import { API_URL } from "../../config";

export const checkAPI = (): boolean => {
  if (!API_URL) {
    throw new Error("La variable de entorno VITE_API_URL no está definida.");
  }
  return true;
}