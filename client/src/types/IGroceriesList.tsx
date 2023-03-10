import { IGroceryList } from "./IGroceryList";

export interface IGroceries {
  groceries: any,
  clearAllFromLocalStorage: () => void,
  setGroceries: (value: IGroceryList) => void
}