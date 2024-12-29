import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";

export default function ProfileCard({
  sp,
  distance,
}: {
  sp: any;
  distance: number;
}) {
  // console.log({ distance });

  const { width, height } = Dimensions.get("window");
  return (
    <View
      style={{
        flexDirection: "column",
        gap: 10,
        width: width * 0.8,
        borderRadius: 10,
        backgroundColor: Colors.white,
        padding: 5,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          router.push({
            pathname: "/spprofile",
            params: { sp: JSON.stringify(sp.name) },
          });
        }}
      >
        <Image
          source={require("@/assets/images/electrical.jpeg")}
          style={{ width: "100%", height: 150, borderRadius: 10 }}
        />
        <Text>{sp.name}</Text>
        <Text>{sp.title}</Text>
        <Text>{sp.address}</Text>
        <Text>{distance.toFixed(2)} km</Text>
        <Text>{sp.description || "no description"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
