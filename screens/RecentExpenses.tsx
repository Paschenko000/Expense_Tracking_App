import { useContext, useEffect, useState } from "react";
import { ExpensesOutput } from "@/components/ExpensesOutput/ExpensesOutput";
import { getItem } from "@/utils/storage";
import {
  getDateMinusDays,
  groupExpensesByDays,
  sortExpenses,
} from "@/utils/date";
import { ExpensesContext } from "@/store/expenses-context";
import { ErrorOverlay } from "@/ui/ErrorOverlay";
import { ICurrency } from "@/constants/Currencies";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

export function RecentExpenses() {
  const [errorState, setErrorState] = useState<string>();
  const [currency, setCurrency] = useState<ICurrency>();

  const bottomPadding = useBottomTabBarHeight();

  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    try {
      setCurrency(getItem("CURRENCY"));
    } catch (error) {
      // @ts-ignore
      setErrorState(error);
    }
  }, []);

  const today = new Date();
  const daysPassed = today.getDate();
  const thisMonthExpenses = expensesCtx.expenses.filter((expense) => {
    const dateMonthAgo = getDateMinusDays(today, daysPassed);
    return new Date(expense.date) > dateMonthAgo;
  });

  const expenses = sortExpenses(thisMonthExpenses);
  // const thisMonthExpenses = groupExpensesByDays(expensesCtx.expenses);

  if (errorState) {
    return <ErrorOverlay message={errorState} />;
  }

  return (
    <ExpensesOutput
      bottomPadding={bottomPadding}
      currency={currency && currency.sign}
      expenses={expenses}
      fallbackText="No expenses registered for the last month"
    />
  );
}
