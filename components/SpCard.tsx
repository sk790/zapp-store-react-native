import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Platform,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import { router, Stack } from "expo-router";

type Prop = {
  name: string;
  title: string;
  address: string;
  image: string;
  distance: number;
  location: {
    lat: number;
    long: number;
  };
};
const SpCard = ({ name, title, address, image, distance, location }: Prop) => {
  const openMap = () => {
    const mapUrl =
      Platform.OS === "ios"
        ? `http://maps.apple.com/?q=${location.lat},${location.long}`
        : `https://www.google.com/maps?q=${location.lat},${location.long}`;
    Linking.canOpenURL(mapUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(mapUrl);
        } else {
          Alert.alert("Error", "Unable to open map");
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };
  return (
    <>
      <View
        style={{
          marginHorizontal: 5,
          backgroundColor: "white",
          paddingVertical: 5,
          borderRadius: 10,
          shadowColor: "#000",
          marginTop: 10,
          paddingHorizontal: 5,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: "/spprofile",
              params: { sp: JSON.stringify(name) },
            });
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Image
                source={{ uri: image }}
                style={{ width: 50, height: 50 }}
              ></Image>

              <View style={{}}>
                <Text>{name}</Text>
                <Text>{title}</Text>
                <Text>{distance}Km</Text>
              </View>
            </View>
            <View style={{}}>
              <Text>{address}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              display: "flex",
              alignSelf: "flex-end",
            }}
            onPress={openMap}
          >
            <Image
              source={require("@/assets/images/direction.png")}
              style={{
                width: 40,
                height: 40,
                backgroundColor: "white",
                borderRadius: 50,
              }}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SpCard;
