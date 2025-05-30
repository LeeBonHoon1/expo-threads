import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { SafeAreaView } from "react-native";

import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/auth-provider";
import * as Crypto from "expo-crypto";
import { router } from "expo-router";
import {
  Camera,
  Hash,
  ImagePlay,
  Images,
  MapPin,
  Mic,
} from "lucide-react-native";

export default function PostScreen() {
  const { user } = useAuth();

  const onPress = async () => {
    if (!user) return;
    const { data, error } = await supabase.from("Post").insert({
      id: Crypto.randomUUID(),
      user_id: user?.id,
      text: "hello world",
    });
    console.log("pressed");
    console.log(data, error);
    if (!error) router.back();
  };
  return (
    <SafeAreaView>
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
      <Button onPress={onPress}>
        <ButtonText>Post</ButtonText>
      </Button>
    </SafeAreaView>
  );
}
