import { supabase } from "@/lib/supabase";
import AuthLayout from "@/screens/auth/_layout";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";

import OTPInputView from "@twotalltotems/react-native-otp-input";
import { Alert } from "react-native";

export default function AuthScreen() {
  const [token, setToken] = useState("");
  const { phone } = useLocalSearchParams();

  const handleVerify = async (verifyToken = token) => {
    if (verifyToken.length !== 6) {
      Alert.alert("Error", "Please enter all 6 digits");
      return;
    }

    const { data, error } = await supabase.auth.verifyOtp({
      phone: phone as string,
      token: verifyToken,
      type: "sms",
    });
    console.log(data, error);
    if (!error) {
      router.push({
        pathname: "/(auth)/username",
      });
    }
  };

  return (
    <AuthLayout onPress={() => handleVerify()} buttonText="Verify">
      <OTPInputView
        pinCount={6}
        autoFocusOnLoad={true}
        onCodeChanged={setToken}
        onCodeFilled={(code) => {
          setToken(code);
          handleVerify(code);
        }}
        codeInputFieldStyle={{
          borderWidth: 1,
          borderColor: "black",
          borderRadius: 10,
          color: "black",
        }}
      />
    </AuthLayout>
  );
}
