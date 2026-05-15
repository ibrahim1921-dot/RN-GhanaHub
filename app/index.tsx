import { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { storage } from '@/utils/storage';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const seen = await storage.get('onboarding_complete');
      router.replace(seen ? '/login' : '/onboarding');
    })();
  }, [router]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#006B3F" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
});
