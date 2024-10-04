import {
  Text,
  TextInput,
  TextInputProps,
  useColorScheme,
  View,
} from "react-native";
import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

type InputProps = {
  label: string;
  textInputConfig: TextInputProps;
  style?: object;
  invalid: boolean;
};
export function Input({ label, textInputConfig, style, invalid }: InputProps) {
  const theme = useColorScheme();
  const colors = theme === "dark" ? Colors.dark : Colors.light;
  const inputStyles = [
    styles.input,
    { color: colors.text, backgroundColor: colors.gradientLight },
  ];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  if (invalid) {
    inputStyles.push({ backgroundColor: colors.inputError });
  }

  return (
    <View style={[styles.container, style]}>
      <Text
        style={[
          styles.label,
          { color: colors.text },
          invalid && { color: colors.textError },
        ]}
      >
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
    marginBottom: 7,
    marginLeft: 15,
  },
  input: {
    fontFamily: "Outfit-Regular",
    padding: 15,
    borderRadius: 10,
    minHeight: 50,
    fontSize: 18,
  },
  inputMultiline: {
    textAlignVertical: "top",
    minHeight: 75,
  },
});
