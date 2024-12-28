import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ProfileField from "@/components/profileTabComponent/ProfileField";
import ImageSection from "@/components/profileTabComponent/ImageSection";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function profile() {
  const inset = useSafeAreaInsets();
  return (
    <ScrollView
      contentContainerStyle={[
        { paddingTop: inset.top },
        styles.scrollContainer,
      ]}
    >
      <View style={styles.container}>
        <View style={styles.imageSection}>
          <Image
            source={{ uri: "https://reactjs.org/logo-og.png" }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
          <View style={styles.nameSection}>
            <Text style={styles.name}>Saurabh</Text>
            <Text style={styles.nickName}>nick name</Text>
          </View>
        </View>
        <View style={{ flexDirection: "column", marginTop: 10, gap: 5 }}>
          <ImageSection label="roorkee" icon={"location-outline"} />
          <ImageSection label="7900482040" icon={"call-outline"} />
          <ImageSection label="saurabh@gmail.com" icon={"mail-outline"} />
        </View>
        <View style={styles.divider} />
        <View style={styles.box}>
          <Text>Wallet</Text>
          <Text>Orders</Text>
        </View>
        <View style={styles.divider} />
        <View style={{ flexDirection: "column", gap: 20 }}>
          <ProfileField label="Your Favorite" icon={"heart-outline"} />
          <ProfileField label="Payment" icon={"cash-outline"} />
          <ProfileField label="Share" icon={"share-outline"} />
          <ProfileField label="Your Service" icon={"create-outline"} />
          <ProfileField label="Settings" icon={"settings-outline"} />
        </View>
      </View>
      <TouchableOpacity style={{ margin: 20 }} onPress={() => {}}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Ionicons name="log-out-outline" size={30} color="red" />
          <Text style={{ color: "red", fontWeight: "600" }}>Logout</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    justifyContent: "space-between",
    backgroundColor: "white",
    flex: 1,
  },
  container: {
    flex: 1,
    marginVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 15,
  },
  box: {
    paddingVertical: 25,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  imageSection: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 10,
  },
  nameSection: {
    flexDirection: "column",
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  nickName: {
    fontSize: 13,
    fontWeight: "500",
    color: Colors.gray,
    fontStyle: "italic",
  },
});
