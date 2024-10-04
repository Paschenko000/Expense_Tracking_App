import {
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IExpense } from "@/modals/expenses.model";
import { GrayLinearGradient } from "@/ui/GrayLinearGradient";
import { Colors } from "@/constants/Colors";
import { ShadowContainer } from "@/ui/ShadowContainer";

export function CategoryItem({
  expenses,
  currency,
}: {
  expenses: IExpense[];
  currency: string;
}) {
  const theme = useColorScheme();
  const colors = theme === "dark" ? Colors.dark : Colors.light;
  const navigation = useNavigation();

  function categoryPressHandler() {
    navigation.navigate("CategoryExpenses", {
      expenses: expenses,
      currency: currency,
    });
  }

  const categorySum = expenses.reduce((sum: number, expense: IExpense) => {
    return sum + expense.amount;
  }, 0);

  return (
    <ShadowContainer color={colors.shadow}>
      <GrayLinearGradient styles={styles.container}>
        <Pressable
          onPress={categoryPressHandler}
          style={({ pressed }) =>
            pressed && [styles.pressed, { backgroundColor: colors.pressed }]
          }
        >
          <View style={styles.expenseCategory}>
            <Text
              style={[
                styles.textBase,
                { paddingBottom: 4, color: colors.text },
              ]}
            >
              {expenses[0].category.name}
            </Text>
            <Text
              style={[styles.amount, { color: expenses[0].category.color }]}
            >
              {categorySum.toFixed(2)}
              {currency}
            </Text>
          </View>
        </Pressable>
      </GrayLinearGradient>
    </ShadowContainer>
  );
}

const styles = StyleSheet.create({
  pressed: {
    borderRadius: 16,
  },
  container: {
    flex: 1,
    marginBottom: 8,
    marginHorizontal: 4,
    padding: 5,
    borderRadius: 20,
  },
  expenseCategory: {
    minHeight: 100,
    padding: 10,
  },
  textBase: {
    fontFamily: "Outfit-Regular",
    fontSize: 16,
    alignItems: "flex-start",
  },
  amount: {
    fontFamily: "Outfit-Bold",
    fontSize: 18,
  },
});
