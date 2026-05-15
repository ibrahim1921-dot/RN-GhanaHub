import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { WebView } from "react-native-webview";

export default function ArticleDetail() {
  const { url, title } = useLocalSearchParams<{ url: string; title: string }>();
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Stack.Screen options={{ title: title || "Article" }} />
      <View style={styles.container}>
        {!loaded && (
          <View style={styles.progressTrack}>
            <View
              style={{
                height: 3,
                width: `${Math.round(progress * 100)}%`,
                backgroundColor: "#006B3F",
              }}
            />
          </View>
        )}
        <WebView
          source={{ uri: url as string }}
          style={styles.webview}
          onLoadProgress={({ nativeEvent }: { nativeEvent: { progress: number } }) =>
            setProgress(nativeEvent.progress)
          }
          onLoadEnd={() => setLoaded(true)}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  progressTrack: {
    height: 3,
    backgroundColor: "#E0E0E0",
  },
  webview: { flex: 1 },
});
