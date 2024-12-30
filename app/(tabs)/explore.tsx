import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import ProfileCard from "@/components/exploreComponents/ProfileCard";
import { AuthContext } from "@/context/authContext";
import { Ionicons } from "@expo/vector-icons";

type Props = {};

const ExploreScreen = (props: Props) => {
  const { location } = useContext(AuthContext);
  const scrollViewRef = useRef<ScrollView>(null);
  const [spList, setSpList] = useState<any[]>([]);
  const [distances, setDistances] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const areaRange = 20;
  const rangeInKm = 10;

  const centralLatitude = location?.latitude || 29.903502;
  const centralLongitude = location?.longitude || 77.945617;

  const latitudeDelta = rangeInKm / 110.574;
  const longitudeDelta =
    rangeInKm / (111.32 * Math.cos((centralLatitude * Math.PI) / 180));

  useEffect(() => {
    const getSpList = async () => {
      try {
        const res = await fetch(
          "http://192.168.120.190:5000/api/sp/search-sp",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ searchQuery, location, areaRange }),
          }
        );

        const data = await res.json();
        if (res.status === 200) {
          setSpList(data.sp);
          setDistances(data.distances);
        } else {
          setSpList([]);
          setDistances([]);
        }
      } catch (error) {
        console.log({ error });
        console.error("Error fetching service providers:", error);
      }
    };
    getSpList();
  }, [searchQuery]);

  const scrollToCard = (index: number) => {
    scrollViewRef.current?.scrollTo({
      x: index * (Dimensions.get("window").width / 2 + 10), // Adjust for card width and gap
      y: 0,
      animated: true,
    });
  };

  const handleSearchCategoryChange = (text: string) => {
    setSearchQuery(text.trim());
  };

  return (
    <>
      <View
        style={[spList.length === 0 ? { height: "100%" } : { height: "65%" }]}
      >
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: centralLatitude,
            longitude: centralLongitude,
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta,
          }}
        >
          {spList.map((item, index) => (
            <Marker
              key={item._id}
              coordinate={{
                latitude: item.location.lat,
                longitude: item.location.long,
              }}
              onPress={() => scrollToCard(index)}
              title={item.provider.phone}
              description={item.address}
              pinColor="red"
              tappable
            />
          ))}
        </MapView>
        <View style={styles.searchBar}>
          <TextInput
            placeholder="Search Category, e.g. Electrician, Mechanic"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={handleSearchCategoryChange}
          />
          <Ionicons name="search-outline" size={20} color="black" />
        </View>
      </View>
      <ScrollView
        horizontal
        ref={scrollViewRef}
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingRight: Platform.OS === "android" ? 20 : 0,
        }}
        style={[
          styles.scrollView,
          spList.length === 0 ? { height: 0 } : { height: 250 },
        ]}
      >
        <View style={{ flexDirection: "row", gap: 10 }}>
          {spList?.length > 0 &&
            spList.map((item, index) => (
              <ProfileCard
                key={item._id}
                sp={item}
                distance={distances[index]}
              />
            ))}
        </View>
      </ScrollView>
    </>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
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
  searchBar: {
    position: "absolute",
    top: 40,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 20,
    padding: 5,
    width: "90%",
    paddingHorizontal: 20,
    marginHorizontal: 20,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchInput: { height: 30, width: "95%", fontSize: 12 },
});
