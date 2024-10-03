import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { GrayLinearGradient } from "./GrayLinearGradient";
import { Currencies } from "@/constants/Currencies";
import { Colors } from "@/constants/Colors";

type SelectProps = {
  selectedCurrency: string;
  setSelectedCurrency: (currency: string) => void;
};
export function Select({ selectedCurrency, setSelectedCurrency }: SelectProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleCurrencySelect = (currency: string) => {
    setSelectedCurrency(currency);
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectedText}>
          Selected Currency: {selectedCurrency}
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <GrayLinearGradient styles={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Currency</Text>
            {Currencies.map((currency) => (
              <>
                <TouchableOpacity
                  key={currency.code}
                  style={styles.currencyOption}
                  onPress={() => handleCurrencySelect(currency.code)}
                >
                  <Text style={styles.currencyText}>{currency.label}</Text>
                </TouchableOpacity>
              </>
            ))}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </GrayLinearGradient>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  selectButton: {
    backgroundColor: Colors.accent,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    minHeight: 50,
    justifyContent: "center",
    marginVertical: 10,
    minWidth: 200,
    alignContent: "center",
  },
  selectedText: {
    color: Colors.black,
    fontSize: 16,
    fontFamily: "Outfit-Medium",
  },
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
    color: Colors.white,
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
    color: Colors.white,
  },
  closeButton: {
    marginVertical: 15,
    alignItems: "center",
  },
  closeText: {
    fontFamily: "Outfit-Regular",
    fontSize: 16,
    color: Colors.accent,
  },
});
