import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function profile() {
  const inset = useSafeAreaInsets();
  return (
    <ScrollView contentContainerStyle={[styles.container,{ paddingTop: inset.top}] }>
      <View>
        <Text>First</Text>
        <Text>profile</Text>
        <Text>profile</Text>
        <Text>profile</Text>
        <Text>profile</Text>
        <Text>profile</Text>
        <Text>profile</Text>

        <Text>Last</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
