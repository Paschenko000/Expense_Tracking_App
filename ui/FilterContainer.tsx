import { GrayLinearGradient } from "@/ui/GrayLinearGradient";
import {
  StyleSheet,
  useColorScheme,
  useWindowDimensions,
  View,
  Text,
} from "react-native";
import { Colors } from "@/constants/Colors";
export function FilterContainer() {
  const theme = useColorScheme();
  const colors = theme === "dark" ? Colors.dark : Colors.light;
  const { height, width } = useWindowDimensions();

  return (
    <GrayLinearGradient
      styles={{
        height: width / 2 - 36,
        width: "50%",
        borderRadius: 20,
        margin: 4,
      }}
    >
      <View style={[styles.headingContainer, { borderColor: colors.pressed }]}>
        <Text style={[styles.heading, { color: colors.text }]}>Chart</Text>
      </View>
    </GrayLinearGradient>
  );
}

const styles = StyleSheet.create({
  headingContainer: {
    paddingTop: 15,
    paddingHorizontal: 15,
    paddingBottom: 5,
    borderBottomWidth: 1,
  },
  heading: {
    fontSize: 16,
    fontFamily: "Outfit-Regular",
  },
});
