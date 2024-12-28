import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import HomeService from "./HomeService";
import { router } from "expo-router";

export default function FeturedServices() {
  const feturedService = [
    {
      id: 1,
      title: "Electrical",
      image: "../assets/images/electrical.jpg",
    },
    {
      id: 2,
      title: "Plumber",
      image: "../assets/images/electrical.jpg",
    },
    {
      id: 3,
      title: "Painter",
      image: "../assets/images/electrical.jpg",
    },
    {
      id: 4,
      title: "Cleaner",
      image: "../assets/images/electrical.jpg",
    },
  ];
  const userCoords = JSON.stringify({ lat: 29.903841, long: 77.945432 });
  const getSp = (service: string, userCoords: string) => {
    router.push({ pathname: "/getsplist", params: { service, userCoords } });
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={styles.text}>FeturedServices</Text>
        <TouchableOpacity
          style={{
            backgroundColor: "white",
            borderWidth: StyleSheet.hairlineWidth,
            borderRadius: 25,
            padding: 5,
          }}
          onPress={() => {
            router.push("/(tabs)/explore");
          }}
        >
          <Text style={{ fontSize: 10 }}>View all</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {feturedService.map((item) => (
          <TouchableOpacity
            onPress={() => {
              getSp(item.title, userCoords);
            }}
            key={item.id}
          >
            <HomeService title={item.title} image={item.image} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  text: {
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: 0.6,
    color: Colors.black,
    marginBottom: 15,
  },
});
