// Empty list state component
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  message: string;
  subtext?: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

export default function EmptyState({
  message,
  subtext,
  icon = "search-outline",
}: Props) {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={56} color="#C0C0C0" />
      <Text style={styles.message}>{message}</Text>
      {subtext ? <Text style={styles.subtext}>{subtext}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    gap: 12,
  },
  message: {
    fontSize: 17,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  subtext: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
  },
});
