import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

export default function MakeSpBotton() {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        marginHorizontal: 20,
        marginBottom: 20,
      }}
    >
      <TouchableOpacity
        style={{
          padding: 20,
          backgroundColor: Colors.lightGray,
          width: "100%",
          alignItems: "center",
          borderRadius: 5,
        }}
      >
        <Text style={{ color: Colors.white, fontWeight: "600", fontSize: 16 }}>
          List Your Service
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
