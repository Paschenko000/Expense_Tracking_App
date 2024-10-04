import { FlatList, Text, useColorScheme, View } from "react-native";
import { StyleSheet } from "react-native";
import { ExpenseItem } from "./ExpenseItem";
import { IExpense } from "@/modals/expenses.model";
import { SummaryContainer } from "@/ui/SummaryContainer";
import { Colors } from "@/constants/Colors";

type ExpensesOutputProps = {
  currency: string;
  expenses: IExpense[];
  expensesPeriod: string;
  fallbackText: string;
};
export function ExpensesOutput({
  currency,
  expenses,
  expensesPeriod,
  fallbackText,
}: ExpensesOutputProps) {
  const theme = useColorScheme();
  const colors = theme === "dark" ? Colors.dark : Colors.light;

  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  function renderExpense(itemData) {
    return <ExpenseItem currency={currency} {...itemData.item} />;
  }

  return (
    <View
      style={[styles.expensesContainer, { backgroundColor: colors.background }]}
    >
      <SummaryContainer
        expensesPeriod={expensesPeriod}
        expensesSum={expensesSum}
        currency={currency}
      />

      {expenses.length > 0 ? (
        <FlatList
          contentContainerStyle={{ marginHorizontal: 4, marginTop: 10 }}
          data={expenses}
          renderItem={renderExpense}
          keyExtractor={(item) => item.id.toString()}
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
