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
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7]}
        renderItem={renderExpense}
        numColumns={2}
        keyExtractor={(item) => item.toString()}
        scrollEnabled={false}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    // flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
});
