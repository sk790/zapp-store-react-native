import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
import { Link, router, Stack } from "expo-router";
import InputFields from "@/components/InputFields";
import { Colors } from "@/constants/Colors";
import SocialLoginBottons from "@/components/SocialLoginBottons";
import { AuthContext } from "@/context/authContext";

type Props = {};

const SignInScreen = (props: Props) => {
  const { setUserToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://192.168.120.190:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone,
          password,
        }),
      });
      const data = await res.json();
      if (res.status === 200) {
        setLoading(false);
        // router.dismissAll();
        setUserToken(data.token);
        router.replace("/(tabs)/");
      } else {
        setLoading(false);
        alert(data.message);
      }
    } catch (error) {
      setLoading(false);
      console.log({ error });
    }
  };
  return (
    <>
      <Stack.Screen options={{ headerTitle: "Sign In" }} />
      <View style={styles.container}>
        <Text style={styles.title}>Login to your account</Text>
        <InputFields
          placeholder="phone...."
          placeholderTextColor={Colors.gray}
          maxLength={10}
          keyboardType="number-pad"
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />
        <InputFields
          placeholder="Password"
          placeholderTextColor={Colors.gray}
          autoCapitalize="none"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.text}>
          <Text>Don't have an account? </Text>
          <Link href={"/signup"} asChild>
            <TouchableOpacity>
              <Text style={styles.loginlink}>signup</Text>
            </TouchableOpacity>
          </Link>
        </View>
        <View style={styles.divider} />
        <SocialLoginBottons emailhref={"/signup"} />
      </View>
    </>
  );
};

export default SignInScreen;

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
});
