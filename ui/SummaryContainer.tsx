import { GrayLinearGradient } from "@/ui/GrayLinearGradient";
import { Text, View, StyleSheet, useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";

type SummaryProps = {
  expensesPeriod: string;
  expensesSum: number;
  currency: string;
};
export function SummaryContainer({
  expensesPeriod,
  expensesSum,
  currency,
}: SummaryProps) {
  const theme = useColorScheme();
  const colors = theme === "dark" ? Colors.dark : Colors.light;

  return (
    <View style={[styles.container, { shadowColor: colors.shadow }]}>
      <GrayLinearGradient styles={styles.summaryContainer}>
        <Text style={[styles.summaryPeriod, { color: colors.text }]}>
          {expensesPeriod}
        </Text>
        <Text style={[styles.sum, { color: colors.accent }]}>
          {expensesSum.toFixed(2)}
          {currency}
        </Text>
      </GrayLinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    elevation: 10,
    zIndex: 10,
    shadowOffset: {
      height: 10,
      width: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,
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
  },
  sum: {
    fontSize: 18,
    fontFamily: "Outfit-ExtraBold",
  },
});
