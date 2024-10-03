import { FlatList, Text, View } from "react-native";
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
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  function renderExpense(itemData) {
    return <ExpenseItem currency={currency} {...itemData.item} />;
  }

  return (
    <View style={styles.expensesContainer}>
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
        <Text style={styles.fallbackText}>{fallbackText}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  expensesContainer: {
    backgroundColor: Colors.black,
    padding: 10,
    flex: 1,
    flexDirection: "column",
  },
  summaryContainer: {
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 4,
    marginTop: 4,
  },
  summaryPeriod: {
    fontFamily: "Outfit-Medium",
    fontSize: 18,
    color: Colors.white,
  },
  sum: {
    fontFamily: "Outfit-ExtraBold",
    fontSize: 18,
    color: Colors.accent,
  },
  fallbackText: {
    fontFamily: "Outfit-Regular",
    color: Colors.accent,
    fontSize: 18,
    textAlign: "center",
    marginVertical: "auto",
  },
});
