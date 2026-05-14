/**
 * @file (drawer)/(news)/_layout.tsx
 * @description Stack navigator for the News section.
 * The index screen shows the article list; [id] shows a single article.
 * The detail screen overrides the header title dynamically with the article title
 * via <Stack.Screen options={{ title: article.title }} /> inside the screen component.
 */

import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function NewsLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: styles.header,
                headerTitleStyle: styles.headerTitle,
                headerTintColor: '#007AFF',
            }}
        >
            <Stack.Screen
                name="index"
                options={{ title: 'News' }}
            />
            <Stack.Screen
                name="[id]"
                options={{ title: 'Article' }}
            />
        </Stack>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#FFFFFF',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#E5E5EA',
    },
    headerTitle: {
        fontSize: 17,
        fontWeight: '600',
        color: '#000000',
    },
});
