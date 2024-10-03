import { Text, TextInput, TextInputProps, View } from "react-native";
import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

type InputProps = {
  label: string;
  textInputConfig: TextInputProps;
  style?: object;
  invalid: boolean;
};
export function Input({ label, textInputConfig, style, invalid }: InputProps) {
  const inputStyles = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    marginHorizontal: 4,
  },
  label: {
    fontFamily: "Outfit-Regular",
    fontSize: 16,
    color: Colors.white,
    marginBottom: 7,
    marginLeft: 15,
  },
  input: {
    fontFamily: "Outfit-Regular",
    padding: 15,
    borderRadius: 10,
    minHeight: 50,
    backgroundColor: Colors.gray,
    fontSize: 18,
    color: Colors.white,
  },
  inputMultiline: {
    textAlignVertical: "top",
    minHeight: 75,
  },
  invalidLabel: {
    color: Colors.red,
  },
  invalidInput: {
    backgroundColor: Colors.error,
  },
});
