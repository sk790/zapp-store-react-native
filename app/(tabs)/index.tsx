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
  const { token, setUserInfo, user } = useContext(AuthContext);
  useEffect(() => {
    if (token === null) {
      router.replace("/signin");
    }
  }, [token]);
  useEffect(() => {
    async function getProfile() {
      try {
        const res = await fetch(
          "http://192.168.120.190:5000/api/user/get-profile"
        );
        const data = await res.json();
        if (res.status === 200) {
          setUserInfo(data.user);
        } else {
          console.log({ data });
        }
      } catch (error) {
        console.log({ error });
      }
    }
    getProfile();
  }, []);
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
        {user?.role === "user" && <MakeSpBotton />}
        {/* <MakeSpBotton /> */}
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
