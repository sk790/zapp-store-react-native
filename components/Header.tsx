import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link, router } from "expo-router";

export default function Header() {
  const inset = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: inset.top }]}>
      <TouchableOpacity
        onPress={() => {
          router.dismissAll();
          router.push("/(tabs)/");
        }}
      >
        <Text style={styles.logo}>ZappStore</Text>
      </TouchableOpacity>
      <Link href={"/explore"} asChild>
        <TouchableOpacity style={styles.searchbar}>
          <Text style={styles.searchText}>Search</Text>
          <Ionicons name="search-outline" size={20} color={Colors.gray} />
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    gap: 15,
    backgroundColor: Colors.white,
  },
  searchbar: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Colors.background,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  logo: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primary,
  },
  searchText: {
    color: Colors.gray,
  },
});
