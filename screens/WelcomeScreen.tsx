import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Linking,
  Pressable,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { storeData } from "@/utils/storage";
import { Currencies } from "@/constants/Currencies";
import { Select } from "@/ui/Select";

export function WelcomeScreen() {
  const theme = useColorScheme();
  const colors = theme === "dark" ? Colors.dark : Colors.light;

  const [selectedCurrency, setSelectedCurrency] = useState<string>("USD");
  const navigation = useNavigation();
  const CURRENCY = "CURRENCY";
  function handleCurrencySelect() {
    const currency = Currencies.find((cur) => cur.code === selectedCurrency);
    storeData(CURRENCY, currency);
    navigation.navigate("ExpensesOverview");
  }

  function handleLinkPress() {
    Linking.openURL("https://github.com/Paschenko000");
  }

  return (
    <SafeAreaView
      style={[styles.safeContainer, { backgroundColor: colors.background }]}
    >
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <View style={styles.textContainer}>
            <Text style={[styles.heading, { color: colors.accent }]}>
              Welcome to Expense Tracker!
            </Text>
            <Text style={[styles.paragraph, { color: colors.text }]}>
              Manage your personal expenses effortlessly with this simple and
              intuitive app. Track your spending in your selected currency, set
              categories, and enjoy a seamless experience. The app also adapts
              to your device’s theme, offering both light and dark modes for
              your convenience.
            </Text>
          </View>
          <View style={styles.currencyContainer}>
            <Select
              selectedCurrency={selectedCurrency}
              setSelectedCurrency={setSelectedCurrency}
            />

            <Pressable
              onPress={handleCurrencySelect}
              style={({ pressed }) => pressed && styles.pressed}
            >
              <View style={styles.button}>
                <Text style={[styles.buttonText, { color: colors.accent }]}>
                  Continue
                </Text>
                <Ionicons
                  name="arrow-forward-outline"
                  size={18}
                  color={colors.accent}
                />
              </View>
            </Pressable>
          </View>
        </View>

        <View style={styles.aboutContainer}>
          <Text style={[styles.about, { color: colors.text }]}>
            This app is a portfolio project built to showcase skills in mobile
            app development using React Native.
          </Text>

          <TouchableOpacity onPress={handleLinkPress}>
            <Text style={[styles.link, { color: colors.accent }]}>
              GitHub: https://github.com/Paschenko000
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginTop: 60,
    marginHorizontal: 15,
    justifyContent: "space-between",
  },
  textContainer: {
    gap: 30,
  },
  heading: {
    fontFamily: "Outfit-ExtraBold",
    fontSize: 24,
    textAlign: "center",
  },
  paragraph: {
    fontFamily: "Outfit-Regular",
    fontSize: 20,
    textAlign: "center",
  },
  about: {
    fontFamily: "Outfit-Regular",
    fontSize: 16,
  },
  link: {
    fontFamily: "Outfit-Bold",
    fontSize: 16,
    fontWeight: "bold",
  },
  currencyContainer: {
    gap: 10,
    justifyContent: "center",
  },
  aboutContainer: {
    marginBottom: 32,
    gap: 10,
  },
  mainContainer: {
    gap: 40,
  },
  button: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  pressed: {
    opacity: 0.75,
  },
  buttonText: {
    fontFamily: "Outfit-Regular",
    fontSize: 16,
  },
});
