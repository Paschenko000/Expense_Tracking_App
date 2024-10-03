import { View, StyleSheet, Text, FlatList } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { IDailyExpenses } from "@/modals/expenses.model";
import { SummaryContainer } from "@/ui/SummaryContainer";
import { DailyExpense } from "@/components/MonthlyExpenses/DailyExpenses";
import { Colors } from "@/constants/Colors";

type MonthlyExpensesProps = {
  currency: string;
  expenses: IDailyExpenses[];
  fallbackText: string;
};
export function MonthlyExpenses({
  currency,
  expenses,
  fallbackText,
}: MonthlyExpensesProps) {
  const bottomPadding = useBottomTabBarHeight();

  let sum = 0;
  expenses.forEach((date) => {
    sum += date.expenses.reduce((sum, expense) => {
      return sum + expense.amount;
    }, 0);
  });

  function renderExpense(itemsData) {
    return <DailyExpense currency={currency} {...itemsData.item} />;
  }

  return (
    <View style={styles.expensesContainer}>
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
    height: 70,
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
