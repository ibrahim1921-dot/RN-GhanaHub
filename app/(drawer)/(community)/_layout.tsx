/**
 * @file (drawer)/(community)/_layout.tsx
 * @description Stack navigator for the Community section.
 * The index screen lists posts; [id] shows a single post's full detail.
 * The detail screen overrides the header title dynamically with the post title
 * via <Stack.Screen options={{ title: post.title }} /> inside the screen component.
 */

import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function CommunityLayout() {
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
                options={{ title: 'Community' }}
            />
            <Stack.Screen
                name="[id]"
                options={{ title: 'Post' }}
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
