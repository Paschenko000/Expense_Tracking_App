import { ActivityIndicator, View, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

export function LoadingOverlay() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color="white" />
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
});
