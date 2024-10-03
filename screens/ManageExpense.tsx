import { ScrollView, View, StyleSheet } from "react-native";
import { ExpensesContext, TExpenseData } from "@/store/expenses-context";
import { useContext, useState, useLayoutEffect } from "react";
import { getItem } from "@/utils/storage";
import { LoadingOverlay } from "@/ui/LoadingOverlay";
import { ErrorOverlay } from "@/ui/ErrorOverlay";
import { ExpenseForm } from "@/components/ManageExpense/ExpensesForm";
import { Colors } from "@/constants/Colors";
import { Button } from "@/ui/Button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ICurrency } from "@/constants/Currencies";

export function ManageExpense({
  route,
  navigation,
}: NativeStackScreenProps<any>) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorState, setErrorState] = useState<string>();
  const [currency, setCurrency] = useState<ICurrency>();

  const expensesCtx = useContext(ExpensesContext);

  const expense = route.params?.expense;
  const isEditing = !!expense;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
    setCurrency(getItem("CURRENCY"));
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setIsSubmitting(true);

    try {
      navigation.goBack();
      expensesCtx.deleteExpense(expense.id);
    } catch (error) {
      // @ts-ignore
      setErrorState(error);
      setIsSubmitting(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function submitHandler(expenseData: TExpenseData) {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        expensesCtx.updateExpense(expense.id, expenseData);
      } else {
        expensesCtx.addExpense({ ...expenseData });
      }
      navigation.goBack();
    } catch (error) {
      // @ts-ignore
      setErrorState(error);
      setIsSubmitting(false);
    }
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  if (errorState && !isSubmitting) {
    return <ErrorOverlay message={errorState} />;
  }

  return (
    <ScrollView style={{ backgroundColor: Colors.black }}>
      <View style={styles.container}>
        <ExpenseForm
          currency={currency && currency.code}
          defaultValues={expense}
          isEditing={isEditing}
          onCancel={cancelHandler}
          onSubmit={submitHandler}
        />

        {isEditing && (
          <View style={styles.deleteContainer}>
            <Button
              mode="flat"
              color={Colors.red}
              onPress={deleteExpenseHandler}
            >
              Delete
            </Button>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  deleteContainer: {
    paddingBottom: 30,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: Colors.lightGray,
  },
  container: {
    backgroundColor: Colors.black,
    flex: 1,
    paddingHorizontal: 10,
  },
});
