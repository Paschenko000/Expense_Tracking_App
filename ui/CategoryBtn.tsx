import {
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

import { GrayLinearGradient } from "./GrayLinearGradient";
import { Colors } from "@/constants/Colors";
import { ICategory } from "@/constants/Categories";

type CategoryBtn = {
  id: number;
  color: string;
  name: string;
  onPress: ({ id, color, name }: ICategory) => {};
  selectedCategory: ICategory;
};
export function CategoryBtn({
  id,
  color,
  name,
  onPress,
  selectedCategory,
}: CategoryBtn) {
  const theme = useColorScheme();
  const colors = theme === "dark" ? Colors.dark : Colors.light;
  // console.log(name, "Category button");
  return (
    <GrayLinearGradient styles={styles.button}>
      <Pressable
        onPress={() => onPress({ id: id, color: color, name: name })}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View
          style={[
            styles.container,
            selectedCategory &&
              id === selectedCategory.id && [
                styles.selectedCategory,
                { backgroundColor: colors.pressed },
              ],
          ]}
        >
          <Text style={[styles.category, { color }]}>{name}</Text>
        </View>
      </Pressable>
    </GrayLinearGradient>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    margin: 4,
    padding: 5,
    borderRadius: 10,
  },
  category: {
    fontFamily: "Outfit-ExtraBold",
    fontSize: 14,
  },
  pressed: {
    opacity: 0.75,
  },
  container: {
    padding: 10,
    minHeight: 55,
  },
  selectedCategory: {
    borderRadius: 8,
  },
});
