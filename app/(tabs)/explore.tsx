import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import ProfileCard from "@/components/exploreComponents/ProfileCard";
import haversineDistance from "@/constants/getDistance";
import { useLocalSearchParams } from "expo-router";
import Animated from "react-native-reanimated";
import { AuthContext } from "@/context/authContext";

type Props = {};

const ExploreScreen = (props: Props) => {
  // const { service, userCoords } = useLocalSearchParams();
  const { location } = useContext(AuthContext);
  const service = "Electrical";
  const scrollViewRef = useRef<ScrollView>(null);

  const areaRange = 10;
  const Sp = [
    {
      id: 1,
      name: "Saurabh",
      title: "Electrical",
      address: "Roorkee",
      image:
        "https://cdni.iconscout.com/illustration/premium/thumb/male-user-image-illustration-download-in-svg-png-gif-file-formats--person-picture-profile-business-pack-illustrations-6515860.png",
      coords: {
        lat: 29.903641,
        long: 77.945432,
      },
    },
    {
      id: 2,
      name: "Prabhat",
      title: "Painter",
      address: "Laksar",
      image:
        "https://cdni.iconscout.com/illustration/premium/thumb/male-user-image-illustration-download-in-svg-png-gif-file-formats--person-picture-profile-business-pack-illustrations-6515860.png",
      coords: {
        lat: 29.903841,
        long: 77.945432,
      },
    },
    {
      id: 3,
      name: "Savan",
      title: "Cleaner",
      address: "Saharanpur",
      image:
        "https://cdni.iconscout.com/illustration/premium/thumb/male-user-image-illustration-download-in-svg-png-gif-file-formats--person-picture-profile-business-pack-illustrations-6515860.png",
      coords: {
        lat: 29.909641,
        long: 77.941432,
      },
    },
    {
      id: 4,
      name: "Nikhil",
      title: "Plumber",
      address: "Delhi",
      image:
        "https://cdni.iconscout.com/illustration/premium/thumb/male-user-image-illustration-download-in-svg-png-gif-file-formats--person-picture-profile-business-pack-illustrations-6515860.png",
      coords: {
        lat: 29.921754, // Service provider's latitude,,,
        long: 77.937274,
      },
    },
    {
      id: 5,
      name: "Rajat",
      title: "Plumber",
      address: "Delhi",
      image:
        "https://cdni.iconscout.com/illustration/premium/thumb/male-user-image-illustration-download-in-svg-png-gif-file-formats--person-picture-profile-business-pack-illustrations-6515860.png",
      coords: {
        lat: 29.89277,
        long: 77.958845,
      },
    },
  ];
  const centralLatitude = 29.903502;
  const centralLongitude = 77.945617;
  const rangeInKm = 10;

  const latitudeDelta = rangeInKm / 110.574;
  const longitudeDelta =
    rangeInKm / (111.32 * Math.cos((centralLatitude * Math.PI) / 180));

  const distances: number[] = [];
  const filterdSp = Sp.filter((sp) => sp.title === service);

  Sp.filter((sp) => {
    const distance = haversineDistance(
      {
        latitude: location.latitude,
        longitude: location.longitude,
      },
      { latitude: sp.coords.lat, longitude: sp.coords.long }
    );
    distances.push(distance); // Push distance to the distances array
    // if (distance <= areaRange) {
    return { ...sp, distance };
    // }
  });
  const scrollToCard = (index: number) => {
    scrollViewRef.current?.scrollTo({
      x: index * (Dimensions.get("window").width / 2 + 10), // Adjust for card width and gap
      y: 0,
      animated: true,
    });
  };

  return (
    <>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: centralLatitude,
            longitude: centralLongitude,
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta,
          }}
        >
          {Sp.map((item, index) => {
            return (
              <Marker
                key={item.id}
                coordinate={{
                  latitude: item.coords.lat,
                  longitude: item.coords.long,
                }}
                onPress={() => scrollToCard(index)}
                title={item.name}
                description={item.address}
                pinColor="red"
              />
            );
          })}
          {location && (
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              pinColor="blue"
            />
          )}
        </MapView>
      </View>
      <ScrollView
        horizontal
        ref={scrollViewRef}
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingRight: Platform.OS === "android" ? 20 : 0,
        }}
        style={[styles.scrollView, { height: 250 }]}
      >
        <View style={{ flexDirection: "row", gap: 10 }}>
          {Sp.map((item, index) => {
            return (
              <ProfileCard
                key={item.id}
                sp={item}
                distance={distances[index]}
              />
            );
          })}
        </View>
      </ScrollView>
    </>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    height: "65%",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  scrollView: {
    position: "absolute",

    bottom: 10,
    left: 10,
    right: 10,
    height: "30%",
  },
});
