import { GrayLinearGradient } from "@/ui/GrayLinearGradient";
import {
  StyleSheet,
  useColorScheme,
  useWindowDimensions,
  View,
  Text,
} from "react-native";
import { Colors } from "@/constants/Colors";

type FilterContainerProps = {
  heading: string;
};
export function FilterContainer({ heading }: FilterContainerProps) {
  const theme = useColorScheme();
  const colors = theme === "dark" ? Colors.dark : Colors.light;
  const { height, width } = useWindowDimensions();

  return (
    <GrayLinearGradient
      styles={{
        height: width / 2,
        width: width / 2 - 15,
        borderRadius: 20,
      }}
    >
      <View style={[styles.headingContainer, { borderColor: colors.pressed }]}>
        <Text style={[styles.heading, { color: colors.text }]}>{heading}</Text>
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
    fontFamily: "Outfit-medium",
  },
});
