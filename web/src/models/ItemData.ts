/**
 * ItemData interface represents the structure of an item in the inventory system.
 */
export interface ItemData {
  id: number;
  code: string;
  name: string;
  description?: string;
  img?: string;
  showcase: number;
  warehouse: number;
  sales: number;
  in_delivery: number;
}
