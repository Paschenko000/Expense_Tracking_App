import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { GrayLinearGradient } from "./GrayLinearGradient";
import { Currencies } from "@/constants/Currencies";
import { Colors } from "@/constants/Colors";
import { Button } from "@/ui/Button";

type SelectProps = {
  selectedCurrency: string;
  setSelectedCurrency: (currency: string) => void;
};
export function Select({ selectedCurrency, setSelectedCurrency }: SelectProps) {
  const theme = useColorScheme();
  const colors = theme === "dark" ? Colors.dark : Colors.light;

  const [modalVisible, setModalVisible] = useState(false);

  const handleCurrencySelect = (currency: string) => {
    setSelectedCurrency(currency);
    setModalVisible(false);
  };

  return (
    <View>
      <Button
        style={{ alignItems: "center" }}
        onPress={() => setModalVisible(true)}
        color={colors.accent}
      >
        Selected Currency: {selectedCurrency}
      </Button>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <GrayLinearGradient styles={styles.modalContent}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Select Currency
            </Text>
            {Currencies.map((currency) => (
              <>
                <TouchableOpacity
                  key={currency.code}
                  style={styles.currencyOption}
                  onPress={() => handleCurrencySelect(currency.code)}
                >
                  <Text style={[styles.currencyText, { color: colors.text }]}>
                    {currency.label}
                  </Text>
                </TouchableOpacity>
              </>
            ))}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={[styles.closeText, { color: colors.accent }]}>
                Close
              </Text>
            </TouchableOpacity>
          </GrayLinearGradient>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalContent: {
    width: "100%",
    padding: 15,
    alignItems: "center",
    borderRadius: 20,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 15,
    fontFamily: "Outfit-Bold",
  },
  currencyOption: {
    padding: 15,
    width: "100%",
    alignItems: "center",
  },
  currencyText: {
    fontFamily: "Outfit-Medium",
    fontSize: 16,
  },
  closeButton: {
    marginVertical: 15,
    alignItems: "center",
  },
  closeText: {
    fontFamily: "Outfit-Regular",
    fontSize: 16,
  },
});
