import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
type Props = {
  label: string;
  icon: any;
};
export default function ImageSection({ label, icon }: Props) {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={20} color="black" />
      <Text style={styles.txt}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  txt: {
    fontSize: 13,
    color: Colors.gray,
    fontWeight: "500",
  },
});
