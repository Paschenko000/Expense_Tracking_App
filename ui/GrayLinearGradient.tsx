import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";

export function GrayLinearGradient({
  styles,
  children,
}: {
  styles: object;
  children: React.ReactNode;
}) {
  return (
    <LinearGradient colors={[Colors.gray, Colors.darkGray]} style={styles}>
      {children}
    </LinearGradient>
  );
}
