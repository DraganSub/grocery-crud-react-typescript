import { IGroceryList } from "./IGroceryList";

export interface IBudgetField {
  budget: number
}

export interface IBudgetProps {
  isBudgetModalOppened: boolean,
  setIsBudgetModalOppened: (value: boolean) => void,
  groceries: IGroceryList[]
}

export interface IBudgetModalData {
  budgetAmmount: number,
  remainingAmmount?: number,
  message: string
}
