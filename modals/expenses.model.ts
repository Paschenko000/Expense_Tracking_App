import { ICategory } from "@/constants/Categories";
export interface IExpense {
  id: number;
  description: string;
  date: string;
  amount: number;
  category: ICategory;
}

export interface IDailyExpenses {
  day: string;
  expenses: IExpense[];
}
