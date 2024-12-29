import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { Link, router, Stack } from "expo-router";
import InputFields from "@/components/InputFields";
import { Colors } from "@/constants/Colors";
import SocialLoginBottons from "@/components/SocialLoginBottons";
import { AuthContext } from "@/context/authContext";

type Props = {};

const SignUpScreen = () => {
  const { setUserToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const handleInputChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match");
    }
    try {
      setIsLoading(true);
      const res = await fetch("http://192.168.120.190:5000/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (res.status === 200) {
        const data = await res.json();
        setUserToken(data.token);
        router.dismissAll();
        router.replace("/(tabs)/");
      } else {
        setIsLoading(false);
        const data = await res.json();
        alert(data.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.log({ error });
    }
  };
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  return (
    <>
      <Stack.Screen options={{ headerTitle: "Sign Up" }} />
      <View style={styles.container}>
        <Text style={styles.title}>Create an accont</Text>
        <InputFields
          placeholder="Phone number.."
          placeholderTextColor={Colors.gray}
          autoCapitalize="none"
          keyboardType="number-pad"
          value={formData.phone}
          maxLength={10}
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
          placeholder="Confirm password"
          placeholderTextColor={Colors.gray}
          autoCapitalize="none"
          secureTextEntry={true}
          value={formData.confirmPassword}
          onChangeText={(value) => handleInputChange("confirmPassword", value)}
        />
        <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
          <Text style={styles.btnText}>Sign Up</Text>
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
