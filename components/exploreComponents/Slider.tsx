import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Slider from "@react-native-community/slider";

type Props = {
  areaRange: number;
  setareaRange: (val: number) => void;
};

export default function RangeSlider({ areaRange, setareaRange }: Props) {
  return (
    <View style={styles.sliderView}>
      <Text style={styles.text}>{areaRange.toFixed(0)}</Text>
      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          value={areaRange}
          onValueChange={(val) => setareaRange(val)}
          minimumTrackTintColor="#1EB1FC"
          maximumTrackTintColor="#8E8E93"
          thumbTintColor="#1EB1FC"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    paddingTop: 5,
    fontSize: 14,
  },
  sliderView: {
    position: "absolute",
    top: 100,
    right: 20,
    width: 30,
    borderRadius: 25,
    backgroundColor: "white",
    alignItems: "center",
  },
  sliderContainer: {
    height: 300, // Height of the vertical slider
    justifyContent: "center",
  },
  slider: {
    width: 300, // This defines the length of the slider track
    transform: [{ rotate: "-90deg" }], // Rotate slider to make it vertical
  },
});
