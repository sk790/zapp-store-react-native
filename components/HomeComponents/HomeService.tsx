import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function HomeService({
  title,
  image,
}: {
  title: string;
  image: string;
}) {
  const WIDTH = Dimensions.get("window").width;
  return (
    <View style={[styles.container, { width: WIDTH / 2 - 24 }]}>
      <Image
        source={require("@/assets/images/electrical.jpeg")}
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
