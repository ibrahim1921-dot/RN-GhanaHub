/**
 * @file (drawer)/_layout.tsx
 * @description Root drawer navigator for GhanaHub.
 * Defines the four main sections of the app — News, Weather, Community, and Profile —
 * each with a label, header title, and icon shown in the side drawer menu.
 */

import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

const ACTIVE_COLOR = "#007AFF";
const INACTIVE_COLOR = "#8E8E93";

export default function DrawerLayout() {
    return (
        <GestureHandlerRootView style={styles.root}>
            <Drawer
                screenOptions={{
                    drawerActiveTintColor: ACTIVE_COLOR,
                    drawerInactiveTintColor: INACTIVE_COLOR,
                    drawerStyle: styles.drawer,
                    headerStyle: styles.header,
                    headerTintColor: ACTIVE_COLOR,
                    headerTitleStyle: styles.headerTitle,
                    drawerLabelStyle: styles.drawerLabel,
                }}
            >
                <Drawer.Screen
                    name="(news)"
                    options={{
                        title: "News",
                        drawerLabel: "News",
                        drawerIcon: ({ color, size }) => (
                            <Ionicons name="newspaper-outline" color={color} size={size} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="(weather)"
                    options={{
                        title: "Weather",
                        drawerLabel: "Weather",
                        drawerIcon: ({ color, size }) => (
                            <Ionicons name="partly-sunny-outline" color={color} size={size} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="(community)"
                    options={{
                        title: "Community",
                        drawerLabel: "Community",
                        drawerIcon: ({ color, size }) => (
                            <Ionicons name="people-outline" color={color} size={size} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="(profile)"
                    options={{
                        title: "Profile",
                        drawerLabel: "Profile",
                        drawerIcon: ({ color, size }) => (
                            <Ionicons name="person-outline" color={color} size={size} />
                        ),
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    drawer: {
        width: 260,
        backgroundColor: "#FFFFFF",
    },
    header: {
        backgroundColor: "#FFFFFF",
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#E5E5EA",
    },
    headerTitle: {
        fontSize: 17,
        fontWeight: "600",
        color: "#000000",
    },
    drawerLabel: {
        fontSize: 15,
        fontWeight: "500",
    },
});
