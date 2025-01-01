import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import SpCard from "@/components/SpCard";
import { AuthContext } from "@/context/authContext";
import { Colors } from "@/constants/Colors";
import { API_URL } from "@env";

export default function GetSpList() {
  const { service: category } = useLocalSearchParams();
  const { location } = useContext(AuthContext);
  const areaRange = 10;
  const [spList, setSpList] = useState<any>([]);
  const [distances, setDistances] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSpList = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${API_URL}/api/sp/get-sp`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ areaRange, category, location }),
        });
        const data = await res.json();
        if (res.status === 200) {
          setIsLoading(false);
          setSpList(data.filterByDistanceandService);
          setDistances(data.distances);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    getSpList();
  }, []);
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: "Service Providers" }} />
      <View style={{ flex: 1, justifyContent: "center" }}>
        {spList.length === 0 ? (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text>No Sp Found</Text>
          </View>
        ) : (
          <FlatList
            data={spList}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item, index }) => {
              return (
                <SpCard
                  key={index}
                  name={item.provider.phone}
                  title={item.serviceName}
                  address={item.address}
                  location={item.location}
                  image={
                    item?.image ||
                    "https://cdni.iconscout.com/illustration/premium/thumb/male-user-image-illustration-download-in-svg-png-gif-file-formats--person-picture-profile-business-pack-illustrations-6515860.png"
                  }
                  distance={distances[index]}
                />
              );
            }}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
});
