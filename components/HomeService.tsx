import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function HomeService({ title }: { title: string }) {
  const WIDTH = Dimensions.get("window").width;
  return (
    <View style={[styles.container, { width: WIDTH / 2 - 24 }]}>
      <Image
        source={{ uri: "https://i.imgur.com/0fE4NwN.png" }}
        style={{ width: "100%", height: 125, borderRadius: 10 }}
      />
      <Text>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 5,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 2,
  },
});
