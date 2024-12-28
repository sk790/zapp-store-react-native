import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { Redirect, router, Stack } from "expo-router";
import Header from "@/components/Header";
import AnimationParallaxCarousel from "@/components/SliderBannerComponents/Banner";
import FeturedServices from "@/components/HomeComponents/FeturedServices";
import PromotionBanner from "@/components/HomeComponents/PromotionBanner";
import MakeSpBotton from "@/components/HomeComponents/MakeSpBotton";
import { AuthContext } from "@/context/authContext";

type Props = {};

const HomeScreen = (props: Props) => {
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (user === null) {
      router.replace("/signin");
    }
  }, [user]);
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
