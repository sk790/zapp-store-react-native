import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import HomeService from "@/components/HomeComponents/HomeService";
import { router } from "expo-router";
import { API_URL } from "@env";

export default function FeturedServices() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetch(`${API_URL}/api/service/get-categories`);
        const data = await response.json();
        console.log({ data });
        if (response.ok) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };
    getCategories();
  }, []);

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
        {categories?.map(
          (item: { category: string; image: string; _id: string }) => (
            <TouchableOpacity
              onPress={() => {
                getSp(item.category);
              }}
              key={item._id}
            >
              <HomeService title={item.category} image={item.image} />
            </TouchableOpacity>
          )
        )}
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
