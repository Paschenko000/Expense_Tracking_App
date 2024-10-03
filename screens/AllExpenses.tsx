import { useContext, useState, useEffect } from "react";
import { ExpensesContext } from "@/store/expenses-context";
import { ErrorOverlay } from "@/ui/ErrorOverlay";
import { Categories } from "@/components/Categories/Categories";
import { getItem } from "@/utils/storage";
import { ICurrency } from "@/constants/Currencies";

export function AllExpenses() {
  const [errorState, setErrorState] = useState<string>();
  const [currency, setCurrency] = useState<ICurrency>();
  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    try {
      setCurrency(getItem("CURRENCY"));
    } catch (error) {
      // @ts-ignore
      setErrorState(error);
    }
  }, []);

  if (errorState) {
    return <ErrorOverlay message={errorState} />;
  }

  return (
    <Categories
      currency={currency && currency.sign}
      expensesPeriod="Total"
      expenses={expensesCtx.expenses}
      fallbackText="No registered expenses found"
    />
  );
}
