import { View, StyleSheet } from "react-native";

export function ShadowContainer({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) {
  return (
    <View style={[styles.shadow, { shadowColor: color }]}>{children}</View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    flex: 1,
    elevation: 5,
    zIndex: 10,
    shadowOffset: {
      height: 4,
      width: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});
