import { Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

type ButtonProps = {
  onPress: () => void;
  mode?: string;
  style?: object;
  color: string;
};
export function Button({
  children,
  onPress,
  mode,
  style,
  color,
}: ButtonProps & { children: React.ReactNode }) {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View
          style={[
            styles.button,
            { backgroundColor: color },
            mode === "flat" && styles.flat,
          ]}
        >
          <Text style={[styles.buttonText, mode === "flat" && { color }]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    padding: 8,
  },
  flat: {
    backgroundColor: "transparent",
  },
  buttonText: {
    fontFamily: "Outfit-Regular",
    fontSize: 16,
    color: Colors.black,
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});
