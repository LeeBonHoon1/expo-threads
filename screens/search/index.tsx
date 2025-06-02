import React from "react";
import { Dimensions, Platform, SafeAreaView } from "react-native";
import WebView, { WebViewMessageEvent } from "react-native-webview";

export default function SearchScreen() {
  const window = Dimensions.get("window");
  const deviceInfo = {
    platform: Platform.OS,
    version: Platform.Version,
    screenWidth: window.width,
    screenHeight: window.height,
  };

  const onMessage = (event: WebViewMessageEvent) => {
    const data = JSON.parse(event.nativeEvent.data);

    if (data.type === "GET_DEVICE_INFO") {
      webViewRef.current?.postMessage(
        JSON.stringify({
          type: "GET_DEVICE_INFO",
          data: deviceInfo,
        })
      );
    }
  };

  const webViewRef = React.useRef<WebView>(null);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        ref={webViewRef}
        source={{ uri: "http://172.30.1.79:3000" }}
        onMessage={onMessage}
      />
    </SafeAreaView>
  );
}
