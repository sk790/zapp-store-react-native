import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import SpCard from "@/components/SpCard";
import { AuthContext } from "@/context/authContext";

export default function GetSpList() {
  const { service: category } = useLocalSearchParams();
  const { location } = useContext(AuthContext);
  const areaRange = 10;
  const [spList, setSpList] = useState<any>([]);
  const [distances, setDistances] = useState([]);

  useEffect(() => {
    const getSpList = async () => {
      try {
        const res = await fetch("http://192.168.120.190:5000/api/sp/get-sp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ areaRange, category, location }),
        });
        const data = await res.json();
        if (res.status === 200) {
          setSpList(data.filterByDistanceandService);
          setDistances(data.distances);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getSpList();
  }, []);

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
                  id={item._id}
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

const styles = StyleSheet.create({});
