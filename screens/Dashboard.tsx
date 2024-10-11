import { useState, useContext, useEffect } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { FilterContainer } from "@/ui/FilterContainer";
import { getItem } from "@/utils/storage";
import { Colors } from "@/constants/Colors";
import { ExpensesContext } from "@/store/expenses-context";
import { CategoryItem } from "@/components/Categories/CategoryItem";

export function Dashboard() {
  const theme = useColorScheme();
  const colors = theme === "dark" ? Colors.dark : Colors.light;
  const [errorState, setErrorState] = useState();
  const [currency, setCurrency] = useState();
  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    try {
      setCurrency(getItem("CURRENCY"));
    } catch (error) {
      setErrorState(error);
    }
  }, []);

  function renderExpense(itemData) {
    return <FilterContainer />;
  }

  return (
    <ScrollView style={[, { backgroundColor: colors.background }]}>
      <View style={styles.container}>
        <FilterContainer heading="This Week" />
        <FilterContainer heading="This Month" />
        <FilterContainer heading="Last Month" />
        <FilterContainer heading="This Year" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
  },
});
