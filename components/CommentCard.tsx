import { View, Text } from "react-native";
import React from "react";
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  comment: string;
  user: any;
  rating: number;
};

const CommentCard = ({ comment, user, rating }: Props) => {
  let arr = [5];
  return (
    <View
      style={{
        backgroundColor: "white",
        paddingVertical: 12,
        borderRadius: 10,
        shadowColor: "#000",
        width: "100%",
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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuphMb4mq-EcVWhMVT8FCkv5dqZGgvn_QiA&s",
            }}
            style={{ width: 40, height: 40, borderRadius: 50 }}
          />
          <Text style={{ fontWeight: "bold", marginLeft: 10 }}>
            {user?.fullName}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Ionicons name="star-outline" size={15} color="orange" />
          <Ionicons name="star-outline" size={15} color="orange" />
        </View>
      </View>
      <Text>{comment}</Text>
    </View>
  );
};

export default CommentCard;
