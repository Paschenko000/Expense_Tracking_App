import { View, StyleSheet, Text, useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";

export function ErrorOverlay({ message }: { message: string }) {
  const theme = useColorScheme();
  const colors = theme === "dark" ? Colors.dark : Colors.light;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, styles.title]}>An error occurred!</Text>
      <Text style={[styles.text, styles.message, { color: colors.inputError }]}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    marginBottom: 8,
  },
  title: {
    fontFamily: "Outfit-Bold",
    fontSize: 18,
  },
  message: {
    fontSize: 16,
  },
});
