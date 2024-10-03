import { GrayLinearGradient } from "@/ui/GrayLinearGradient";
import { Text, View, StyleSheet } from "react-native";
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
  return (
    <View style={styles.container}>
      <GrayLinearGradient styles={styles.summaryContainer}>
        <Text style={styles.summaryPeriod}>{expensesPeriod}</Text>
        <Text style={styles.sum}>
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
    shadowColor: "#000000",
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
    color: Colors.white,
  },
  sum: {
    fontSize: 18,
    fontFamily: "Outfit-ExtraBold",
    color: Colors.accent,
  },
});
