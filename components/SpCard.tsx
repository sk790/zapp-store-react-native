import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { router } from "expo-router";

type Prop = {
  name: string;
  title: string;
  id: number;
  address: string;
  image: string;
  distance: number;
};
const SpCard = ({ name, title, id, address, image, distance }: Prop) => {
  // console.log(distance);
  // useEffect(() => {
  //   console.log(distance);
  // }, [distance]);

  return (
    <View
      style={{
        marginHorizontal: 10,
        backgroundColor: "white",
        paddingVertical: 12,
        borderRadius: 10,
        shadowColor: "#000",
        marginTop: 20,
        paddingHorizontal: 10,
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

            <View>
              <Text>{name}</Text>
              <Text>{title}</Text>
              <Text>{distance.toFixed(2)}Km</Text>
            </View>
          </View>
          <View>
            <Text>{address}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SpCard;
