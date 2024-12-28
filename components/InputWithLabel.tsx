import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

type Props = {
  label: string;
  placeholder: string;
  multiline?: boolean;
  lines?: number;
  onChangeText: (text: string) => void;
  value: string;
};

export default function InputWithLabel({
  label,
  placeholder,
  multiline,
  lines,
  value,
  onChangeText,
}: Props) {
  return (
    <View>
      <Text
        style={{
          fontWeight: "600",
          color: Colors.black,
          marginTop: 20,
          marginBottom: 10,
        }}
      >
        {label}
      </Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: Colors.gray,
          padding: 5,
          borderRadius: 5,
        }}
        placeholder={placeholder}
        multiline={multiline} // Enables multi-line input
        numberOfLines={lines} // Sets an initial height (optional)
        textAlignVertical="top"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
