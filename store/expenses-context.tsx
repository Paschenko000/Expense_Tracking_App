import { createContext, Reducer, useEffect, useReducer } from "react";
import { getItem, storeData } from "@/utils/storage";
import { IExpense } from "@/modals/expenses.model";
import { LoadingOverlay } from "@/ui/LoadingOverlay";

export type TExpenseData = {
  description: string;
  amount: number;
  date: string;
  category: { id: number; name: string; color: string };
};

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date, category }: TExpenseData) => {},
  deleteExpense: (id: number) => {},
  updateExpense: (
    id: number,
    { description, amount, date, category }: TExpenseData,
  ) => {},
});

export enum EExpensesReducerAction {
  Add = "ADD",
  Update = "UPDATE",
  Delete = "DELETE",
  set = "SET",
}

export interface IExpensesReducerAction {
  type: EExpensesReducerAction;
  // @TODO: ADD ACTUAL TYPE
  payload: any;
}

const expensesReducer: Reducer<IExpense[], IExpensesReducerAction> = (
  state,
  action,
) => {
  switch (action.type) {
    case "ADD":
      const id = Math.random();
      const expensesAdd = [{ ...action.payload, id }, ...state];
      storeData("EXPENSES", expensesAdd);
      return expensesAdd;
    case "SET":
      return action.payload;
    case "UPDATE":
      const itemIToUpdate = state.findIndex(
        (expense) => expense.id === action.payload.id,
      );
      const itemToUpdate = state[itemIToUpdate];
      const updatedItem = { ...itemToUpdate, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[itemIToUpdate] = updatedItem;
      storeData("EXPENSES", updatedExpenses);
      return updatedExpenses;
    case "DELETE":
      const expenses = state.filter((expense) => expense.id !== action.payload);
      storeData("EXPENSES", expenses);
      return expenses;
    default:
      return state;
  }
};

export function ExpensesContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [expensesState, dispatch] = useReducer<
    Reducer<IExpense[], IExpensesReducerAction>
  >(expensesReducer, null);

  useEffect(() => {
    const data = getItem("EXPENSES");

    if (data) {
      dispatch({ type: EExpensesReducerAction.set, payload: data });
    } else {
      dispatch({ type: EExpensesReducerAction.set, payload: [] });
    }
  }, []);

  function addExpense(expenseData: TExpenseData) {
    dispatch({ type: EExpensesReducerAction.Add, payload: expenseData });
  }

  function deleteExpense(id: number) {
    dispatch({ type: EExpensesReducerAction.Delete, payload: id });
  }

  function updateExpense(id: number, expenseData: TExpenseData) {
    dispatch({
      type: EExpensesReducerAction.Update,
      payload: { id, data: expenseData },
    });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  if (expensesState === null) {
    return <LoadingOverlay />;
  }

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
