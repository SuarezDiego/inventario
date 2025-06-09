import type { ItemData } from "../../models/ItemData";

export const getItems = async (): Promise<ItemData[]> => {
    console.log("Fetching items from API...");
    const url = `http://127.0.0.1:8000/items/ `
    const response = await fetch(url);
    return await response.json();

};