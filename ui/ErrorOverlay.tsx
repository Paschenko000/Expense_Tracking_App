import { View, StyleSheet, Text } from "react-native";
import { Colors } from "@/constants/Colors";

export function ErrorOverlay({ message }: { message: string }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occurred!</Text>
      <Text style={[styles.text, styles.message]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.black,
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
    color: Colors.error,
  },
});
