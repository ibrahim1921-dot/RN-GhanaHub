/**
 * @file (drawer)/(weather)/_layout.tsx
 * @description Stack navigator for the Weather section.
 * Contains a single screen showing current weather conditions.
 */

import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function WeatherLayout() {
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
                options={{ title: 'Weather' }}
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
