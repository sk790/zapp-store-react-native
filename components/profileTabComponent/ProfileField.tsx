import { StyleSheet, Text, View } from "react-native";
import React, { ReactNode } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

type Props = {
  label: string;
  icon: any;
};
export default function ProfileField({ label, icon }: Props) {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={25} color="purple" />
      <Text style={styles.txt}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    color: Colors.black,
    gap: 15,
  },
  txt: {
    fontSize: 16,
    fontWeight: "500",
  },
});
