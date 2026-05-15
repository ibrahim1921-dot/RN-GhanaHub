import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Pressable,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import CustomInput from "@/components/ui/CustomInput";
import CustomButton from "@/components/ui/CustomButton";
import { storage } from "@/utils/storage";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Errors = { name?: string; email?: string; password?: string };

export default function Login() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  // clear asynchStorage in the app for development purposes
  const resetOnboarding = async () => {
    await storage.remove("user_name");
    router.replace("/onboarding");
  };

  const clearError = (field: keyof Errors) =>
    setErrors((prev) => ({ ...prev, [field]: undefined }));

  const validate = (): boolean => {
    const next: Errors = {};
    if (!name.trim()) next.name = "Name is required.";
    if (!email.trim()) next.email = "Email is required.";
    else if (!EMAIL_RE.test(email)) next.email = "Enter a valid email address.";
    if (!password) next.password = "Password is required.";
    else if (password.length < 6)
      next.password = "Password must be at least 6 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    setLoading(true);
    await storage.set("user_name", name.trim());
    await new Promise((r) => setTimeout(r, 800));
    router.replace("/(drawer)");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={{ padding: 12, alignItems: "center" }}>
        <Pressable
          style={{
            backgroundColor: "#E53E3E",
            paddingHorizontal: 16,
            borderRadius: 8,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={resetOnboarding}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "600",
              fontSize: 14,
            }}
          >
            Reset onboarding
          </Text>
        </Pressable>
      </View>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={styles.appName}>GhanaHub</Text>
            <Text style={styles.subtitle}>Welcome — sign in to continue</Text>
          </View>

          <View style={styles.form}>
            <CustomInput
              label="Full name"
              placeholder="e.g. Kofi Mensah"
              value={name}
              onChangeText={(v) => {
                setName(v);
                clearError("name");
              }}
              error={errors.name}
              autoCapitalize="words"
              autoCorrect={false}
            />
            <CustomInput
              label="Email"
              placeholder="you@example.com"
              value={email}
              onChangeText={(v) => {
                setEmail(v);
                clearError("email");
              }}
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <CustomInput
              label="Password"
              placeholder="••••••"
              value={password}
              onChangeText={(v) => {
                setPassword(v);
                clearError("password");
              }}
              error={errors.password}
              secureTextEntry
            />

            <CustomButton
              title="Sign In"
              loading={loading}
              onPress={handleLogin}
              style={styles.button}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  flex: { flex: 1 },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  header: { marginBottom: 40, alignItems: "center" },
  appName: {
    fontSize: 32,
    fontWeight: "800",
    color: "#006B3F",
    marginBottom: 8,
  },
  subtitle: { fontSize: 16, color: "#555" },
  form: { gap: 20 },
  button: { marginTop: 8 },
});
