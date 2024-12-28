import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { Link, router, Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import Animated, { FadeInLeft, FadeInRight } from "react-native-reanimated";
import SocialLoginBottons from "@/components/SocialLoginBottons";
import { AuthContext } from "@/context/authContext";

type Props = {};

const WelcomeScreen = (props: Props) => {
  const { user, setUserInfo } = useContext(AuthContext);
  useEffect(() => {
    if (user) {
      router.replace("/(tabs)");
    }
  }, [user]);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ImageBackground
        source={require("@/assets/images/ecommerce-splash.jpg")}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <LinearGradient
            colors={[
              "transparent",
              "rgba(255, 255, 255, 0.9)",
              "rgba(255, 255, 255, 1)",
            ]}
            style={styles.background}
          >
            <View style={styles.wrapper}>
              <Animated.Text
                style={styles.title}
                entering={FadeInRight.delay(300).duration(300).springify()}
              >
                ZAPPSTORE
              </Animated.Text>
              <Animated.Text
                style={styles.description}
                entering={FadeInRight.delay(500).duration(300).springify()}
              >
                this is description
              </Animated.Text>
              <SocialLoginBottons emailhref={"/signup"} />
              <View style={styles.text}>
                <Text>Already have an account? </Text>
                <Link href={"/signin"} asChild>
                  <TouchableOpacity>
                    <Text style={styles.loginlink}>signin</Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          </LinearGradient>
        </View>
      </ImageBackground>
    </>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    flex: 1,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "flex-end",
  },
  wrapper: {
    paddingBottom: 50,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    color: Colors.primary,
    fontWeight: "900",
    letterSpacing: 1,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 20,
    letterSpacing: 1.2,
    lineHeight: 30,
  },

  text: {
    flexDirection: "row",
    fontSize: 14,
    lineHeight: 24,
    marginTop: 30,
    color: Colors.gray,
  },
  loginlink: {
    color: Colors.primary,
    fontWeight: "600",
  },
});
