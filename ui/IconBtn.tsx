import { Pressable, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type IconBtnProps = {
  icon: string;
  size: number;
  color: string;
  onPress: () => void;
};
export function IconButton({ icon, size, color, onPress }: IconBtnProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.buttonContainer}>
        <Ionicons name={icon} size={size} color={color} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingRight: 20,
  },
  pressed: {
    opacity: 0.75,
  },
});
