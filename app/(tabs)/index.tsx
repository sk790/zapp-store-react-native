import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { Stack } from "expo-router";
import Header from "@/components/Header";
import AnimationParallaxCarousel from "@/components/Banner";
import FeturedServices from "@/components/FeturedServices";
import PromotionBanner from "@/components/PromotionBanner";
import MakeSpBotton from "@/components/MakeSpBotton";

type Props = {};

const HomeScreen = (props: Props) => {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => <Header />,
        }}
      />
      <ScrollView>
        <AnimationParallaxCarousel />
        <View style={styles.feturedStyle}>
          <FeturedServices />
        </View>
        <PromotionBanner />
        <MakeSpBotton />
        <View style={styles.container}></View>
      </ScrollView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  feturedStyle: {
    marginHorizontal: 20,
  },
});
