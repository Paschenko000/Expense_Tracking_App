import { View, StyleSheet, Text, FlatList, useColorScheme } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { IDailyExpenses } from "@/modals/expenses.model";
import { SummaryContainer } from "@/ui/SummaryContainer";
import {
  DailyExpense,
  ExpenseItem,
} from "@/components/ExpensesOutput/ExpenseItem";
import { Colors } from "@/constants/Colors";

type MonthlyExpensesProps = {
  currency: string;
  expenses: IDailyExpenses[];
  fallbackText: string;
  bottomPadding: number;
};
export function ExpensesOutput({
  currency,
  expenses,
  fallbackText,
  bottomPadding,
}: MonthlyExpensesProps) {
  const theme = useColorScheme();
  const colors = theme === "dark" ? Colors.dark : Colors.light;

  let sum = 0;
  expenses.forEach((date) => {
    sum += date.expenses.reduce((sum, expense) => {
      return sum + expense.amount;
    }, 0);
  });

  function renderExpense(itemsData) {
    return <ExpenseItem currency={currency} {...itemsData.item} />;
  }

  return (
    <View
      style={[styles.expensesContainer, { backgroundColor: colors.background }]}
    >
      <SummaryContainer
        expensesPeriod="This Month"
        expensesSum={sum}
        currency={currency}
      />

      {expenses.length > 0 ? (
        <FlatList
          contentContainerStyle={{
            paddingBottom: bottomPadding,
            marginHorizontal: 4,
            marginTop: 20,
          }}
          data={expenses}
          renderItem={renderExpense}
          keyExtractor={(item) => item.day}
        />
      ) : (
        <Text style={[styles.fallbackText, { color: colors.accent }]}>
          {fallbackText}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  expensesContainer: {
    padding: 10,
    flex: 1,
    flexDirection: "column",
  },
  fallbackText: {
    fontFamily: "Outfit-Regular",
    fontSize: 18,
    textAlign: "center",
    marginVertical: "auto",
  },
});
