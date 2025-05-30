import { useRouter } from "expo-router";
import { useState } from "react";

import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { supabase } from "@/lib/supabase";
import AuthLayout from "@/screens/auth/_layout";

export default function AuthScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState("");

  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithOtp({
      phone: `+1${phone}`,
    });

    if (!error) {
      router.push({
        pathname: "/(auth)/verify",
        params: {
          phone: `+1${phone}`,
        },
      });
    }
    console.log(data, error);
  };

  return (
    <AuthLayout onPress={handleSignIn} buttonText="Sign In">
      <Text className="text-lg font-bold text-black">
        Enter your phone number
      </Text>
      <Input variant="outline" size="md">
        <InputField
          placeholder="Phone Number (e.g. 5555555555)"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </Input>
    </AuthLayout>
  );
}
