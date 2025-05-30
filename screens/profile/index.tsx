import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/providers/auth-provider";
import { SafeAreaView } from "react-native";

export default function ProfileScreen() {
  const { logOut } = useAuth();
  return (
    <SafeAreaView>
      <Text className="text-2xl font-bold">Profile</Text>

      <Button onPress={logOut}>
        <ButtonText>Log Out</ButtonText>
      </Button>
    </SafeAreaView>
  );
}
