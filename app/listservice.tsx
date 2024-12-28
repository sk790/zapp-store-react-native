import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import CheckBox from "react-native-check-box";
import CategoryDropdown from "@/components/CategoryDropdown";
import { Colors } from "@/constants/Colors";
import InputWithLabel from "@/components/InputWithLabel";
import Header from "@/components/Header";
import { Stack } from "expo-router";

export default function listservice() {
  const [formData, setFormData] = useState({
    serviceName: "",
    nickName: "",
    description: "",
    category: "",
    address: "",
  });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleInputChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const handleCategoryChange = (value: string | null) => {
    setSelectedCategory(value);
    formData.category = value as string;
  };
  const handleSubmit = () => {
    console.log("Form Data Submitted:", formData);
    // Perform further actions like sending the data to an API
  };
  return (
    <ScrollView>
      <Stack.Screen options={{ headerShown: true, header: () => <Header /> }} />
      <View style={styles.container}>
        <Text style={styles.text}>Add Your Service</Text>
        <Text style={styles.subtext}>
          Provide details about the service you offer
        </Text>
        <InputWithLabel
          label="Service Name"
          placeholder="Service Name..."
          value={formData.serviceName}
          onChangeText={(value) => handleInputChange("serviceName", value)}
        />
        <InputWithLabel
          label="Nick Name"
          placeholder="e.g. chota chaitan...."
          value={formData.nickName}
          onChangeText={(value) => handleInputChange("nickName", value)}
        />
        <InputWithLabel
          label="Description"
          placeholder="Description..."
          lines={4}
          value={formData.description}
          onChangeText={(value) => handleInputChange("description", value)}
        />

        <Text style={styles.categoryLabel}>Category</Text>
        <CategoryDropdown onCategoryChange={handleCategoryChange} />
        <InputWithLabel
          label="Address"
          placeholder="Address..."
          multiline={true}
          lines={3}
          value={formData.address}
          onChangeText={(value) => handleInputChange("address", value)}
        />
        <TouchableOpacity style={styles.addServiceBtn} onPress={handleSubmit}>
          <Text style={styles.addServiceBtnText}>Add Service</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  text: {
    fontWeight: "600",
    color: Colors.black,
    fontSize: 20,
  },
  subtext: {
    fontSize: 14,
    color: Colors.gray,
  },
  addServiceBtn: {
    marginTop: 20,
    backgroundColor: "#4CAF50",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  addServiceBtnText: {
    color: Colors.white,
    fontWeight: "600",
    fontSize: 16,
  },
  categoryLabel: {
    fontWeight: "600",
    color: Colors.black,
    marginTop: 20,
    marginBottom: 10,
  },
});