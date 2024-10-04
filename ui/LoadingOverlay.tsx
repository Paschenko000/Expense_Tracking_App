import {
  ActivityIndicator,
  View,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { Colors } from "@/constants/Colors";
export function LoadingOverlay() {
  const theme = useColorScheme();
  const colors = theme === "dark" ? Colors.dark : Colors.light;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ActivityIndicator size="small" color="white" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
