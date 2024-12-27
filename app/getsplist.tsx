import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import SpCard from "@/components/SpCard";
import haversineDistance from "@/constants/getDistance";

export default function GetSpList() {
  const { service, userCoords } = useLocalSearchParams();
  const user = JSON.parse(userCoords as string);
  const areaRange = 1;

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
  const distances: number[] = [];
  const filterdSp = Sp.filter((sp) => sp.title === service);

  const filterByDistanceandService = filterdSp.filter((sp) => {
    const distance = haversineDistance(
      { latitude: user.lat, longitude: user.long },
      { latitude: sp.coords.lat, longitude: sp.coords.long }
    );
    distances.push(distance); // Push distance to the distances array
    if (distance <= areaRange) {
      return { ...sp, distance };
    }
  });

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      {filterByDistanceandService.length === 0 ? (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text>No Sp Found</Text>
        </View>
      ) : (
        <FlatList
          data={filterByDistanceandService}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => {
            return (
              <SpCard
                name={item.name}
                title={item.title}
                address={item.address}
                id={item.id}
                image={item.image}
                distance={distances[index]}
              />
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
