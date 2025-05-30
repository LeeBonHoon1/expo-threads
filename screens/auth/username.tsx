import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/providers/auth-provider";
import { useState } from "react";
import AuthLayout from "./_layout";

export default function AuthScreen() {
  const { createUser } = useAuth();
  const [username, setUsername] = useState("");

  const handleUsername = async () => {
    createUser(username);
  };

  return (
    <AuthLayout onPress={handleUsername} buttonText="Create Account">
      <Text className="text-lg font-bold text-black">Username</Text>
      <Input variant="outline" size="md">
        <InputField
          placeholder="Enter Username..."
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </Input>
    </AuthLayout>
  );
}
