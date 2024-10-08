import { useContext, useLayoutEffect } from "react";
import { ExpensesContext } from "@/store/expenses-context";
import { ExpensesOutput } from "@/components/ExpensesOutput/ExpensesOutput";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { sortExpenses } from "@/utils/date";

export function CategoryExpenses({
  route,
  navigation,
}: NativeStackScreenProps<any>) {
  const expensesCtx = useContext(ExpensesContext);

  // TODO: check props type {route, navigation}
  const expenses = route.params?.expenses;
  const currency = route.params?.currency;
  const expensesCat = expensesCtx.expenses.filter(
    (expense) => expense.category.id === expenses[0].category.id,
  );

  const sortedExpenses = sortExpenses(expensesCat);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: expenses[0].category.name,
    });
  }, [navigation, expenses]);

  return (
    <ExpensesOutput
      bottomPadding={0}
      currency={currency}
      expenses={sortedExpenses}
      fallbackText="No registered expenses found"
    />
  );
}
