import { FlatList, Text, View, StyleSheet, useColorScheme } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { IExpense } from "@/modals/expenses.model";
import { Input } from "@/ui/Input";
import { IconButton } from "@/ui/IconBtn";
import { CategoriesData, ICategory } from "@/constants/Categories";
import { Button } from "@/ui/Button";
import { Colors } from "@/constants/Colors";
import { TExpenseData } from "@/store/expenses-context";
import { CategoryBtn } from "@/ui/CategoryBtn";
import { validateDate } from "@/utils/date";

type FormProps = {
  currency: string;
  onCancel: () => void;
  onSubmit: (expenseData: TExpenseData) => void;
  isEditing: boolean;
  defaultValues?: IExpense;
};

type InputsType = {
  amount: {
    value: number | string;
    isValid: boolean;
  };
  date: {
    value: string;
    isValid: boolean;
  };
  description: {
    value: string;
    isValid: boolean;
  };
  category: {
    value: { id: number; name: string; color: string };
    isValid: boolean;
  };
};
export function ExpenseForm({
  currency,
  onCancel,
  onSubmit,
  isEditing,
  defaultValues,
}: FormProps) {
  const theme = useColorScheme();
  const colors = theme === "dark" ? Colors.dark : Colors.light;
  const navigation = useNavigation();
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues
        ? new Date(defaultValues.date).toISOString().slice(0, 10)
        : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
    category: {
      value: defaultValues ? { ...defaultValues.category } : "",
      isValid: true,
    },
  });

  function categorySelectionHandler(category: ICategory) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        category: {
          value: {
            id: category.id,
            name: category.name,
            color: category.color,
          },
          isValid: true,
        },
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: inputs.date.value,
      description: inputs.description.value,
      category: {
        id: inputs.category.value.id,
        name: inputs.category.value.name,
        color: inputs.category.value.color,
      },
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = validateDate(expenseData.date);
    const descriptionIsValid = expenseData.description.trim().length > 0;
    const categoryIsValid = !!expenseData.category.id;

    if (
      !amountIsValid ||
      !dateIsValid ||
      !descriptionIsValid ||
      !categoryIsValid
    ) {
      setInputs((curInputs: InputsType) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          category: {
            value: {
              id: curInputs.category.value.id,
              name: curInputs.category.value.name,
              color: curInputs.category.value.color,
            },
            isValid: categoryIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  }

  function inputChangeHandler(inputIdentifier: string, enteredValue: any) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function renderCategory(itemData) {
    return (
      <CategoryBtn
        {...itemData.item}
        onPress={categorySelectionHandler}
        selectedCategory={inputs.category.value}
      />
    );
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={[styles.title, { color: colors.text }]}>
        Type Your Expense
      </Text>
      <View style={styles.inputsRow}>
        <Input
          label={"Amount (" + currency + ")"}
          invalid={!inputs.amount.isValid}
          style={styles.rowInput}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />
        <Input
          label="Date"
          invalid={!inputs.date.isValid}
          style={styles.rowInput}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
      />

      {formIsInvalid && (
        <Text style={[styles.errorText, { color: colors.textError }]}>
          Invalid input values - please check your entered data!
        </Text>
      )}
      <View style={styles.categoriesContainer}>
        <Text style={[styles.title, { color: colors.text }]}>
          Select Category
        </Text>

        {!inputs.category.isValid && (
          <Text style={[styles.errorText, { color: colors.textError }]}>
            Please select category!
          </Text>
        )}
        <FlatList
          data={CategoriesData}
          renderItem={renderCategory}
          keyExtractor={(item) => item.name}
          numColumns={2}
          scrollEnabled={false}
        />
      </View>

      <View style={styles.buttonsContainer}>
        <Button
          mode="flat"
          color={colors.accent}
          onPress={onCancel}
          style={styles.button}
        >
          Cancel
        </Button>
        <Button
          color={colors.accent}
          onPress={submitHandler}
          style={styles.button}
        >
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 30,
  },
  title: {
    fontFamily: "Outfit-Bold",
    fontSize: 22,
    marginBottom: 20,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  categoriesContainer: {
    marginTop: 20,
  },
  buttonsContainer: {
    marginTop: 10,
    paddingBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    minWidth: 80,
    marginHorizontal: 5,
  },
  errorText: {
    fontFamily: "Outfit-Regular",
    textAlign: "center",
    margin: 8,
    fontSize: 16,
  },
});
