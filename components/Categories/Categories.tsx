import { FlatList, StyleSheet, Text, useColorScheme, View } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { CategoryItem } from "./CategoryItem";
import { IExpense } from "@/modals/expenses.model";
import { CategoriesData } from "@/constants/Categories";
import { Colors } from "@/constants/Colors";
import { SummaryContainer } from "@/ui/SummaryContainer";

type ExpensesCategoryProps = {
  currency: string;
  expenses: IExpense[];
  expensesPeriod: string;
  fallbackText: string;
};

export function Categories({
  currency,
  expenses,
  expensesPeriod,
  fallbackText,
}: ExpensesCategoryProps) {
  const theme = useColorScheme();
  const colors = theme === "dark" ? Colors.dark : Colors.light;
  const bottomPadding = useBottomTabBarHeight();

  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  const categoryExpenses = [];

  for (const { id } of CategoriesData) {
    const filteredExpenses = expenses.filter(
      (expense) => expense.category.id === id,
    );
    if (filteredExpenses?.length > 0) {
      categoryExpenses.push(filteredExpenses);
    }
  }

  function renderExpense(itemData) {
    return <CategoryItem currency={currency} expenses={itemData.item} />;
  }

  return (
    <View
      style={[styles.expensesContainer, { backgroundColor: colors.background }]}
    >
      {expenses.length > 0 ? (
        <>
          <SummaryContainer
            expensesPeriod={expensesPeriod}
            expensesSum={expensesSum}
            currency={currency}
          />
          <FlatList
            contentContainerStyle={{
              paddingBottom: bottomPadding,
              marginTop: 10,
            }}
            data={categoryExpenses}
            renderItem={renderExpense}
            keyExtractor={(item) => item[0].category.id.toString()}
            numColumns={2}
          />
        </>
      ) : (
        <Text
          style={[
            styles.fallbackText,
            { color: colors.accent },
            { paddingBottom: bottomPadding },
          ]}
        >
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
