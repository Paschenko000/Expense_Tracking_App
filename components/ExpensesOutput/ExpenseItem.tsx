import {
  Pressable,
  Text,
  View,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GrayLinearGradient } from "@/ui/GrayLinearGradient";
import { Colors } from "@/constants/Colors";
import { getFormattedDate } from "@/utils/date";
import { IExpense } from "@/modals/expenses.model";
import { ShadowContainer } from "@/ui/ShadowContainer";

export function ExpenseItem({
  currency,
  id,
  description,
  amount,
  date,
  category,
}: IExpense & { currency: string }) {
  const theme = useColorScheme();
  const colors = theme === "dark" ? Colors.dark : Colors.light;

  const navigation = useNavigation();
  function expensePressHandler() {
    navigation.navigate("ManageExpense", {
      expense: { id, description, amount, date, category },
    });
  }

  return (
    // <ShadowContainer color={colors.shadow}>
    <GrayLinearGradient styles={styles.container}>
      <Pressable
        onPress={expensePressHandler}
        style={({ pressed }) =>
          pressed && [styles.pressed, { backgroundColor: colors.pressed }]
        }
      >
        <View style={styles.expenseItem}>
          <View style={styles.textContainer}>
            <Text style={[styles.amount, { color: category.color }]}>
              {category.name}
            </Text>
            <Text
              style={[
                styles.textBase,
                { paddingBottom: 2, color: colors.text },
              ]}
            >
              {description}
            </Text>
          </View>
          <View style={styles.amountContainer}>
            <Text style={[styles.amount, { color: category.color }]}>
              {amount.toFixed(2) + currency}
            </Text>
            <Text style={[styles.textBase, { color: colors.text }]}>
              {getFormattedDate(date)}
            </Text>
          </View>
        </View>
      </Pressable>
    </GrayLinearGradient>
    // {/*</ShadowContainer>*/}
  );
}

const styles = StyleSheet.create({
  pressed: {
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
    alignItems: "flex-start",
  },
  amount: {
    fontFamily: "Outfit-Bold",
    fontSize: 18,
  },
});
