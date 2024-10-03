import { Pressable, Text, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GrayLinearGradient } from "@/ui/GrayLinearGradient";
import { Colors } from "@/constants/Colors";
import { getFormattedDate } from "@/utils/date";
import { IExpense } from "@/modals/expenses.model";

export function ExpenseItem({
  currency,
  id,
  description,
  amount,
  date,
  category,
}: IExpense & { currency: string }) {
  const navigation = useNavigation();
  function expensePressHandler() {
    navigation.navigate("ManageExpense", {
      expense: { id, description, amount, date, category },
    });
  }

  return (
    <GrayLinearGradient styles={styles.container}>
      <Pressable
        onPress={expensePressHandler}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={styles.expenseItem}>
          <View style={styles.textContainer}>
            <Text style={[styles.amount, { color: category.color }]}>
              {category.name}
            </Text>
            <Text style={[styles.textBase, { paddingBottom: 2 }]}>
              {description}
            </Text>
          </View>
          <View style={styles.amountContainer}>
            <Text style={[styles.amount, { color: category.color }]}>
              {amount.toFixed(2) + currency}
            </Text>
            <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
          </View>
        </View>
      </Pressable>
    </GrayLinearGradient>
  );
}

const styles = StyleSheet.create({
  pressed: {
    backgroundColor: Colors.lightGray,
    borderRadius: 16,
  },
  container: {
    padding: 5,
    borderRadius: 20,
    marginBottom: 8,
  },
  expenseItem: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  textContainer: {
    gap: 4,
    alignItems: "flex-start",
  },
  amountContainer: {
    gap: 4,
    alignItems: "flex-end",
  },
  textBase: {
    fontFamily: "Outfit-Regular",
    fontSize: 16,
    color: Colors.white,
    alignItems: "flex-start",
  },
  amount: {
    fontFamily: "Outfit-Bold",
    fontSize: 18,
    color: Colors.accent,
  },
});
