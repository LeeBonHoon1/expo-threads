import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import WebviewCampaign from "@/webview/campaigns";
import { SafeAreaView } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <VStack style={{ flex: 1 }}>
        <Text>gasdf</Text>
        <WebviewCampaign dom={{ scrollEnabled: false }} />
      </VStack>
    </SafeAreaView>
  );
}
