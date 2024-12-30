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

type Props = {
  distance: number;
  sp: {
    category: string;
    available: boolean;
    address: string;
    description: string;
    provider: {
      phone: string;
    };
  };
};
export default function ProfileCard({ distance, sp }: Props) {
  const { width } = Dimensions.get("window");
  return (
    <View style={[styles.container, { width: width * 0.8 }]}>
      <TouchableOpacity
        onPress={() => {
          router.push({
            pathname: "/spprofile",
            params: { sp: JSON.stringify(sp.provider.phone) },
          });
        }}
      >
        <Image
          source={require("@/assets/images/electrical.jpeg")}
          style={{ width: "100%", height: 100, borderRadius: 10 }}
        />
        <Text>{sp.category}</Text>
        <Text>{sp.available.toString()}</Text>
        <Text>{sp.address}</Text>
        <Text>{distance} km</Text>
        <Text>{sp.description || "no description"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 10,
    borderRadius: 10,
    backgroundColor: Colors.white,
    padding: 5,
  },
});
