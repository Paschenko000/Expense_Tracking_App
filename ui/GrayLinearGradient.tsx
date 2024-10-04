import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";

export function GrayLinearGradient({
  styles,
  children,
}: {
  styles: object;
  children: React.ReactNode;
}) {
  const theme = useColorScheme();
  const colors = theme === "dark" ? Colors.dark : Colors.light;

  return (
    <LinearGradient
      colors={[colors.gradientLight, colors.gradientDark]}
      style={styles}
    >
      {children}
    </LinearGradient>
  );
}
