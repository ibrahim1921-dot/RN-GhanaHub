import { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from "react-native";
import useFetch from "@/hooks/useFetch";
import useDebounce from "@/hooks/useDebounce";
import { fetchTopHeadlines, searchNews } from "@/api/newsApi";
import { NewsArticle } from "@/types/news";
import NewsCard from "@/components/news/NewsCard";
import EmptyState from "@/components/ui/EmptyState";

function mapArticles(raw: any[]): NewsArticle[] {
  return raw
    .filter((a) => a.title && a.title !== "[Removed]" && a.url)
    .map((a, i) => ({
      id: a.url || String(i),
      title: a.title,
      description: a.description || "",
      url: a.url,
      imageUrl: a.urlToImage || "",
      publishedAt: a.publishedAt || "",
      sourceName: a.source?.name || "",
    }));
}

export default function NewsScreen() {
  const [query, setQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const debouncedQuery = useDebounce(query, 500);

  const { data, isLoading, error, refetch } = useFetch(
    () => (debouncedQuery ? searchNews(debouncedQuery) : fetchTopHeadlines()),
    [debouncedQuery]
  );

  const articles = mapArticles((data as any)?.data?.articles ?? []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchWrapper}>
        <TextInput
          style={styles.search}
          placeholder="Search Ghana news..."
          placeholderTextColor="#999"
          value={query}
          onChangeText={setQuery}
          clearButtonMode="while-editing"
          returnKeyType="search"
          autoCorrect={false}
        />
      </View>

      {isLoading && !isRefreshing ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#006B3F" />
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <EmptyState
            icon="cloud-offline-outline"
            message="Could not load news"
            subtext={error}
          />
        </View>
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <NewsCard article={item} index={index} />
          )}
          contentContainerStyle={
            articles.length === 0 ? styles.emptyContainer : styles.listContent
          }
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              colors={["#006B3F"]}
              tintColor="#006B3F"
            />
          }
          ListEmptyComponent={
            <EmptyState
              icon="newspaper-outline"
              message="No articles found"
              subtext={
                debouncedQuery
                  ? `No results for "${debouncedQuery}"`
                  : "Pull down to refresh"
              }
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  searchWrapper: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E0E0E0",
  },
  search: {
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 9,
    fontSize: 15,
    color: "#1A1A1A",
  },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  listContent: { paddingVertical: 8 },
  emptyContainer: { flex: 1 },
});
