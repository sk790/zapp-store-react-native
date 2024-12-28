import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {};

const OrderScreen = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text>Order Screen</Text>
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
