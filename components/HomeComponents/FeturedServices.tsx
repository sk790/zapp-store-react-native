import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import { Colors } from "@/constants/Colors";
import HomeService from "@/components/HomeComponents/HomeService";
import { router } from "expo-router";
import { AuthContext } from "@/context/authContext";

export default function FeturedServices() {
  const { location } = useContext(AuthContext);
  const feturedService = [
    {
      id: 1,
      title: "electrician",
      image: require("@/assets/images/electrical.jpeg"),
    },
    {
      id: 2,
      title: "plumber",
      image: require("@/assets/images/electrical.jpeg"),
    },
    {
      id: 3,
      title: "painter",
      image: require("@/assets/images/electrical.jpeg"),
    },
    {
      id: 4,
      title: "cleaner",
      image: require("@/assets/images/electrical.jpeg"),
    },
  ];
  const getSp = (service: string) => {
    router.push({ pathname: "/getsplist", params: { service } });
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
              getSp(item.title);
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
