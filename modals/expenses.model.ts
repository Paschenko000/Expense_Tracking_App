export interface IExpense {
  id: number;
  description: string;
  date: string;
  amount: number;
  category: {
    id: number;
    name: string;
    color: string;
  };
}

export interface IDailyExpenses {
  day: Date;
  expenses: IExpense[];
}
