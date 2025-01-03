import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import React, { useEffect, useState } from "react";
import { API_URL } from "@env";

type Props = {
  onCategoryChange: (value: string | null) => void; // Callback function to send data to parent
};

export default function CategoryDropdown({ onCategoryChange }: Props) {
  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);

  const category = [
    { label: "electrician", value: "1" },
    { label: "plumber", value: "2" },
    { label: "carpenter", value: "3" },
    { label: "painter", value: "4" },
    { label: "cleaner", value: "5" },
    { label: "machanic", value: "6" },
  ];

  const handleChange = (item: { label: string; value: string }) => {
    setValue(item.value); // Update local state
    onCategoryChange(item.label); // Send the selected value to the parent
    setIsFocus(false);
  };

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        data={category}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select Category" : "..."}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={handleChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "#8888",
    borderRadius: 8,
  },
  dropdown: {
    height: 45,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
});
