import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Linking,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { storeData } from "@/utils/storage";
import { Currencies } from "@/constants/Currencies";
import { Select } from "@/ui/Select";

export function WelcomeScreen() {
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
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.heading}>Welcome to Expense Tracker!</Text>
            <Text style={styles.paragraph}>
              Manage your personal expenses effortlessly with this simple and
              intuitive app. Track your spending in selected currency, set
              categories.
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
                <Text style={styles.buttonText}>Continue</Text>
                <Ionicons
                  name="arrow-forward-outline"
                  size={20}
                  color={Colors.accent}
                />
              </View>
            </Pressable>
          </View>
        </View>

        <View style={styles.aboutContainer}>
          <Text style={styles.about}>
            This app is a portfolio project built to showcase my skills in
            mobile app development using React Native.
          </Text>

          <TouchableOpacity onPress={handleLinkPress}>
            <Text style={styles.link}>
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
    backgroundColor: Colors.black,
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
    color: Colors.accent,
    textAlign: "center",
  },
  paragraph: {
    fontFamily: "Outfit-Regular",
    fontSize: 20,
    color: Colors.white,
    textAlign: "center",
  },
  about: {
    fontFamily: "Outfit-Regular",
    fontSize: 16,
    color: Colors.white,
  },
  link: {
    fontFamily: "Outfit-Bold",
    fontSize: 16,
    color: Colors.accent,
    fontWeight: "bold",
  },
  currencyContainer: {
    gap: 20,
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
    color: Colors.accent,
  },
});
