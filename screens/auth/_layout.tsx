import ThreadsIcon from "@/assets/icons/threads";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { View } from "@/components/ui/view";
import { VStack } from "@/components/ui/vstack";
import { router } from "expo-router";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";

export default function AuthLayout({
  children,
  onPress,
  buttonText,
}: {
  children: React.ReactNode;
  onPress: () => void;
  buttonText: string;
}) {
  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <VStack className="justify-between h-full w-full">
            <VStack className="items-center justify-center">
              <HStack className="items-center justify-between w-full p-3">
                <Button onPress={() => router.back()} variant="link" size="lg">
                  <ButtonText>Back</ButtonText>
                </Button>
                <ThreadsIcon size={40} />
                <View className="w-10" />
              </HStack>
            </VStack>
            <VStack space="md" className="p-3">
              {children}
            </VStack>
            <VStack className="items-center justify-center p-3">
              <Button onPress={onPress} size="lg" className="w-full">
                <ButtonText>{buttonText}</ButtonText>
              </Button>
            </VStack>
          </VStack>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
