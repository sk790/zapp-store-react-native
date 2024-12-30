import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  label: string;
  placeholder: string;
  multiline?: boolean;
  lines?: number;
  onChangeText: (text: string) => void;
  value: string;
  handleGetLocation?: () => void;
  locBtnStyle?: any;
  locBtnLoading?: boolean;
};

export default function InputWithLabel({
  label,
  placeholder,
  multiline,
  lines,
  value,
  onChangeText,
  handleGetLocation,
  locBtnStyle,
  locBtnLoading,
}: Props) {
  return (
    <>
      <Text style={styles.labelTxt}>{label}</Text>
      <View
        style={
          handleGetLocation && {
            flexDirection: "row",
            justifyContent: "space-between",
          }
        }
      >
        <TextInput
          style={[
            styles.textInput,
            handleGetLocation && { flex: 1, marginRight: 10 },
          ]}
          placeholder={placeholder}
          multiline={multiline}
          numberOfLines={lines}
          textAlignVertical="top"
          value={value}
          onChangeText={onChangeText}
        />
        {handleGetLocation && (
          <TouchableOpacity
            style={[styles.getLocationBtn, { backgroundColor: locBtnStyle }]}
            onPress={handleGetLocation}
          >
            <View style={{ flexDirection: "row", gap: 1 }}>
              {locBtnLoading ? (
                <ActivityIndicator
                  size="small"
                  color="#fff"
                  style={{ paddingHorizontal: 40 }}
                />
              ) : (
                <>
                  <Ionicons name="location-outline" size={20} color="black" />
                  <Text>Get Location</Text>
                </>
              )}
            </View>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  getLocationBtn: {
    padding: 3,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
  },
  textInput: {
    borderWidth: 1,
    borderColor: Colors.gray,
    padding: 5,
    borderRadius: 5,
  },
  labelTxt: {
    fontWeight: "600",
    color: Colors.black,
    marginTop: 20,
    marginBottom: 10,
  },
});
