import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useContext, useState } from "react";
import { useLocalSearchParams } from "expo-router";
//   import { AuthContext } from "@/context/authContext";
import { Ionicons } from "@expo/vector-icons";
import CommentCard from "@/components/CommentCard";
import { formatMongoDate } from "@/constants/formatedDate";

const spprofile = () => {
  const { sp } = useLocalSearchParams();
  const sps = JSON.parse(sp as string);
  // console.log(sps);

  // console.log(sps.provider.mobile);

  // const { user } = useContext(AuthContext);
  const user = {
    name: "Saurabh",
    coords: {
      lat: 29.903641,
      long: 77.945432,
    },
    image:
      "https://cdni.iconscout.com/illustration/premium/thumb/male-user-image-illustration-download-in-svg-png-gif-file-formats--person-picture-profile-business-pack-illustrations-6515860.png",
  };
  const openWhatsapp = () => {
    // Linking.openURL(`whatsapp://send?text=Hello&phone=+7900482041`)
    Linking.openURL(`whatsapp://send?text=Hello&phone=+7900482040`);
  };
  const makeCall = () => {
    Linking.openURL(`tel:+917900482040`);
  };
  const [selectedOption, setSelectedOption] = useState(null);

  const options = ["1", "2", "3", "4", "5"];

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          marginTop: 10,
          paddingHorizontal: 15,
          flexDirection: "column",
          gap: 10,
          marginBottom: 10,
        }}
      >
        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Image
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuphMb4mq-EcVWhMVT8FCkv5dqZGgvn_QiA&s?height=200&width=200",
              }}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
            <View>
              <Text style={{ fontWeight: "bold" }}>{sps || "Anonymous"}</Text>
              <Text style={{ color: "gray" }}>{"Nick name"}</Text>
              <View style={{ marginTop: 10, flexDirection: "row", gap: 1 }}>
                <Ionicons name={"star-outline"} color={"orange"} size={17} />
                <Text style={{ fontSize: 11, fontWeight: "bold" }}>
                  {4.7}(247 ratings)
                </Text>
              </View>
            </View>
          </View>
          <View style={{ gap: 5 }}>
            <TouchableOpacity
              style={{ backgroundColor: "green", padding: 5, borderRadius: 5 }}
              onPress={makeCall}
            >
              <View style={{ flexDirection: "row" }}>
                <Ionicons name="call" color={"white"} size={20} />
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 12 }}
                >
                  Call Now
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: "green", padding: 5, borderRadius: 5 }}
              onPress={openWhatsapp}
            >
              <View style={{ flexDirection: "row" }}>
                <Ionicons name="logo-whatsapp" color={"white"} size={20} />
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 12 }}
                >
                  WhatsApp
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: "yellow", padding: 5, borderRadius: 5 }}
            >
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                {/* <Ionicons name="" color={"white"} size={20} /> */}
                <Text
                  style={{ color: "black", fontWeight: "bold", fontSize: 12 }}
                >
                  {sps?.available ? "Available" : "Not Available"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text>{sps?.description}</Text>
        </View>
        <View style={{ flexDirection: "column", gap: 8 }}>
          <Text style={{ fontWeight: "bold", marginBottom: 10 }}>Details</Text>
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Ionicons name="location-outline" size={20} />
            <Text>{"Roorkee"}</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Ionicons name="time-outline" size={20} />
            <Text>{"10:00 AM - 10:00 PM"}</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Ionicons name="storefront-outline" size={20} />
            <Text>{"Shope name"}</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Ionicons name="storefront-outline" size={20} />
            <Text>{`Start from:date`}</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 5 }}>
            <Ionicons name="thumbs-up-outline" size={20} />
            <Text>
              <Text style={{ fontWeight: "bold" }}>
                {/* {sps.provider.serviceResolved} */}
                50
              </Text>{" "}
              Complaints resolved
            </Text>
          </View>
        </View>
        <View>
          <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
            Recent Comments
          </Text>
          <View
            style={{
              marginBottom: 10,
              backgroundColor: "white",
              paddingVertical: 12,
              borderRadius: 10,
              shadowColor: "#000",
              width: "100%",
              padding: 10,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Write a comment</Text>
            <Text
              style={{
                fontWeight: 500,
                fontSize: 12,
                marginTop: 10,
                marginBottom: 5,
              }}
            >
              Your Comment
            </Text>
            <TextInput
              placeholder="Write your comment here....."
              multiline
              numberOfLines={4}
              style={{
                borderWidth: 1,
                padding: 7,
                borderColor: "gray",
                borderRadius: 10,
                fontWeight: "500",
                textAlignVertical: "top",
              }}
            />
            <View>
              <Text style={{ fontWeight: "bold", marginTop: 10 }}>Rating</Text>
              <View style={{ flexDirection: "row", gap: 8 }}>
                {options.map((option: any, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.optionContainer}
                    onPress={() => setSelectedOption(option)}
                  >
                    <View style={styles.radioCircle}>
                      {selectedOption === option && (
                        <View style={styles.selectedCircle} />
                      )}
                    </View>
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <TouchableOpacity
              style={{
                width: "25%",
                backgroundColor: "green",
                padding: 5,
                borderRadius: 5,
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 15,
                  textAlign: "center",
                }}
              >
                Submit
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ gap: 5 }}>
            <CommentCard
              comment="Comment goes here Comment goes here Comment goes here Comment goes here Comment goes here"
              rating={5}
              user={user}
            />
            <CommentCard
              comment="Comment goes here Comment goes here Comment goes here Comment goes here Comment goes here"
              rating={5}
              user={user}
            />
            <CommentCard
              comment="Comment goes here Comment goes here Comment goes here Comment goes here Comment goes here"
              rating={5}
              user={user}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radioCircle: {
    height: 15,
    width: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#4CAF50",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedCircle: {
    height: 8,
    width: 8,
    borderRadius: 6,
    backgroundColor: "#4CAF50",
  },
  optionText: {
    marginLeft: 2,
    fontSize: 16,
  },
});
export default spprofile;
