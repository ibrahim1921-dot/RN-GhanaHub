// Individual news card
import {
  TouchableOpacity,
  ImageBackground,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { NewsArticle } from "@/types/news";
import { formatDate } from "@/utils/formatDate";

interface Props {
  article: NewsArticle;
  index: number;
}

export default function NewsCard({ article, index }: Props) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() =>
        router.push({
          pathname: "/(drawer)/(news)/[id]",
          params: { id: String(index), url: article.url, title: article.title },
        })
      }
    >
      <ImageBackground
        source={article.imageUrl ? { uri: article.imageUrl } : undefined}
        style={styles.image}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay}>
          <Text style={styles.source} numberOfLines={1}>
            {article.sourceName}
          </Text>
          <Text style={styles.title} numberOfLines={2}>
            {article.title}
          </Text>
          <Text style={styles.date}>{formatDate(article.publishedAt)}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 14,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  image: {
    height: 200,
    backgroundColor: "#D0D0D0",
    justifyContent: "flex-end",
  },
  imageStyle: {
    borderRadius: 14,
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.55)",
    padding: 14,
    gap: 4,
  },
  source: {
    fontSize: 11,
    fontWeight: "600",
    color: "#FCD116",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
    lineHeight: 22,
  },
  date: {
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
  },
});
