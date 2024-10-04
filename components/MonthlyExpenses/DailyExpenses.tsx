import {
  Text,
  View,
  StyleSheet,
  Pressable,
  useColorScheme,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IExpense } from "@/modals/expenses.model";
import { formatDate } from "@/utils/date";
import { GrayLinearGradient } from "@/ui/GrayLinearGradient";
import { Colors } from "@/constants/Colors";
import { ShadowContainer } from "@/ui/ShadowContainer";

type DailyExpensesProps = {
  expenses: IExpense[];
  day: Date;
  currency: string;
};
export function DailyExpense({ expenses, day, currency }: DailyExpensesProps) {
  const theme = useColorScheme();
  const colors = theme === "dark" ? Colors.dark : Colors.light;

  const navigation = useNavigation();

  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  const date = formatDate(day);

  function expensePressHandler(expense) {
    navigation.navigate("ManageExpense", { expenseId: expense });
  }

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={[styles.date, { color: colors.text }]}>{date}</Text>
        <Text style={[styles.sum, { color: colors.accent }]}>
          {expensesSum + currency}
        </Text>
      </View>
      <ShadowContainer color={colors.shadow}>
        <GrayLinearGradient styles={styles.expensesContainer}>
          {expenses.map((expense) => (
            <Pressable
              onPress={() => expensePressHandler(expense)}
              key={expense.id}
              style={({ pressed }) =>
                pressed && [styles.pressed, { backgroundColor: colors.pressed }]
              }
            >
              <View style={styles.expenseButton}>
                <View style={styles.textContainer}>
                  <Text
                    style={[
                      styles.expenseCategory,
                      { color: expense.category.color },
                    ]}
                  >
                    {expense.category.name}
                  </Text>
                  <Text style={[styles.description, { color: colors.text }]}>
                    {expense.description}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.expenseCategory,
                    { color: expense.category.color },
                  ]}
                >
                  {expense.amount + currency}
                </Text>
              </View>
            </Pressable>
          ))}
        </GrayLinearGradient>
      </ShadowContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  pressed: {
    borderRadius: 16,
  },
  container: {
    gap: 10,
    marginBottom: 20,
  },
  headingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    alignItems: "flex-start",
  },
  date: {
    fontFamily: "Outfit-Medium",
    fontSize: 18,
  },
  sum: {
    fontFamily: "Outfit-Bold",
    fontSize: 18,
  },
  expensesContainer: {
    padding: 5,
    borderRadius: 20,
  },
  expenseButton: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  expenseCategory: {
    fontSize: 16,
    fontFamily: "Outfit-Bold",
  },
  description: {
    fontFamily: "Outfit-Regular",
    fontSize: 16,
    alignItems: "flex-start",
  },
  textContainer: {
    gap: 5,
    alignItems: "flex-start",
  },
});
