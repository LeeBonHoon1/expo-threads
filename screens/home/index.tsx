import ThreadsIcon from "@/assets/icons/threads";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useAuth } from "@/providers/auth-provider";
import { router } from "expo-router";
import {
  Camera,
  Hash,
  ImagePlay,
  Images,
  MapPin,
  Mic,
} from "lucide-react-native";
import { Pressable, SafeAreaView } from "react-native";

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <SafeAreaView>
      <HStack className="justify-center items-center">
        <ThreadsIcon size={40} />
      </HStack>
      <Pressable
        onPress={() => {
          router.push("/post");
        }}
      >
        <HStack className="items-center p-5">
          <Avatar size="md">
            <AvatarFallbackText>{user?.username}</AvatarFallbackText>
            <AvatarImage
              source={{
                uri: user?.avatar,
              }}
            />
          </Avatar>
          <Card size="md" className="m-3 bg-transparent">
            <VStack className="p-3" space="lg">
              <VStack>
                <Heading size="md" className="mb-1">
                  {user?.username}
                </Heading>
                <Text size="sm">{`What's new?`}</Text>
              </VStack>
              <HStack className="items-center" space="3xl">
                <Images size={24} color="gray" />
                <Camera size={24} color="gray" />
                <ImagePlay size={24} color="gray" />
                <Mic size={24} color="gray" />
                <Hash size={24} color="gray" />
                <MapPin size={24} color="gray" />
              </HStack>
            </VStack>
          </Card>
        </HStack>
      </Pressable>
    </SafeAreaView>
  );
}
