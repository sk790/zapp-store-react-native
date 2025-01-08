import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Link, router, Stack } from "expo-router";
import InputFields from "@/components/InputFields";
import { Colors } from "@/constants/Colors";
import SocialLoginBottons from "@/components/SocialLoginBottons";
import { AuthContext } from "@/context/authContext";
import { API_URL } from "@env";

type Props = {};

const SignUpScreen = () => {
  const { setUserToken, token, loading, setLoading } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
    confirmPassword: "",
  });
  useEffect(() => {
    if (token) {
      router.dismissAll();
      router.replace("/(tabs)");
    }
  }, [token]);
  const handleInputChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const handleOtp = async () => {
    if (!formData.phone) return alert("Please enter phone number");
    try {
      setIsLoading(true);
      const res = await fetch(`${API_URL}/api/user/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: formData.phone }),
      });
      const data = await res.json();
      if (res.status === 200) {
        setIsOtpSent(true);
        setIsLoading(false);
        alert(data.message);
      } else {
        setIsLoading(false);
        console.log({ data });
        alert(data.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.log({ error });
    }
  };
  const handleVerifyOtp = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_URL}/api/user/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: formData.phone,
          otp,
          password: formData.password,
        }),
      });
      const data = await res.json();
      console.log({ data });

      if (res.status === 200) {
        setIsLoading(false);
        setUserToken(data.token);
        router.dismissAll();
        router.replace("/(tabs)");
      } else {
        setIsLoading(false);
        alert(data.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.log({ error });
    }
  };

  // if (isLoading) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <ActivityIndicator size="large" color={Colors.primary} />
  //     </View>
  //   );
  // }
  return (
    <>
      <ScrollView>
        <Stack.Screen options={{ headerTitle: "Sign Up" }} />
        <View style={styles.container}>
          <Text style={styles.title}>Create an accont</Text>

          <InputFields
            placeholder={"Phone Number"}
            placeholderTextColor={Colors.gray}
            value={formData.phone}
            keyboardType="number-pad"
            onChangeText={(value) => handleInputChange("phone", value)}
          />
          <InputFields
            placeholder="Password"
            placeholderTextColor={Colors.gray}
            autoCapitalize="none"
            value={formData.password}
            secureTextEntry={true}
            onChangeText={(value) => handleInputChange("password", value)}
          />
          <InputFields
            placeholder="confirm Password"
            placeholderTextColor={Colors.gray}
            keyboardType="number-pad"
            value={formData.confirmPassword}
            secureTextEntry={true}
            onChangeText={(value) =>
              handleInputChange("confirmPassword", value)
            }
          />
          <View
            style={{
              flexDirection: "row",
              marginBottom: 10,
            }}
          >
            <TextInput
              style={{
                flex: 1,
                backgroundColor: "white",
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
                paddingHorizontal: 12,
              }}
              placeholder="OTP"
              placeholderTextColor={Colors.gray}
              maxLength={4}
              keyboardType="number-pad"
              value={otp}
              onChangeText={(value) => setOtp(value)}
            />
            <TouchableOpacity
              style={{
                backgroundColor: "gray",
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
                justifyContent: "center",
                paddingHorizontal: 2,
              }}
              onPress={handleOtp}
              disabled={isOtpSent}
            >
              <Text style={{ color: "white", fontWeight: "600" }}>
                {isOtpSent ? "Resend" : "Get Otp"}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.btn} onPress={handleVerifyOtp}>
            <Text style={styles.btnText}>
              {loading ? (
                <ActivityIndicator size="small" color={Colors.white} />
              ) : (
                "Sign Up"
              )}
            </Text>
          </TouchableOpacity>
          <View style={styles.text}>
            <Text>Already have an account? </Text>
            <Link href={"/signin"} asChild>
              <TouchableOpacity>
                <Text style={styles.loginlink}>signin</Text>
              </TouchableOpacity>
            </Link>
          </View>
          <View style={styles.divider} />
          <SocialLoginBottons emailhref={"/signin"} />
        </View>
      </ScrollView>
    </>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    letterSpacing: 1.2,
    color: Colors.black,
    marginBottom: 50,
  },
  btnText: {
    color: Colors.white,
    fontWeight: "600",
    fontSize: 16,
  },
  btn: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 18,
    alignSelf: "stretch",
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  text: {
    flexDirection: "row",
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 30,
    color: Colors.gray,
  },
  loginlink: {
    color: Colors.primary,
    fontWeight: "600",
  },
  divider: {
    borderTopColor: Colors.lightGray,
    borderTopWidth: StyleSheet.hairlineWidth,
    width: "30%",
    marginBottom: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
});
