/**
 * @file (drawer)/(profile)/_layout.tsx
 * @description Stack navigator for the Profile section.
 * The index screen displays the user's profile; edit.tsx provides the edit form.
 */

import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function ProfileLayout() {
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
                options={{ title: 'Profile' }}
            />
            <Stack.Screen
                name="edit"
                options={{ title: 'Edit Profile' }}
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
