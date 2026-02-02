import { useState, useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";
import { Screen } from "../../components/Screen";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useMe } from "../../hooks/useMe";
import { useAuth } from "../../auth/AuthContext";
import { updateMe } from "../../api/users";
import { colors, spacing, typography } from "../../theme";
import { useQueryClient } from "@tanstack/react-query";

export default function ProfileScreen() {
  const { data, isLoading, isError } = useMe();
  const { signOut } = useAuth();
  const queryClient = useQueryClient();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (data) {
      setFullName(data.fullName || "");
      setEmail(data.email || "");
      setEditing(!data.profileDone);
    }
  }, [data]);

  if (isLoading) {
    return (
      <Screen>
        <Text>Loading profile…</Text>
      </Screen>
    );
  }

  if (isError || !data) {
    return (
      <Screen>
        <Text style={styles.error}>Unable to load profile</Text>
      </Screen>
    );
  }

  const saveProfile = async () => {
    if (!fullName.trim()) {
      setError("Full name is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await updateMe({
        fullName: fullName.trim(),
        email: email.trim() || undefined,
      });

      await queryClient.invalidateQueries({ queryKey: ["me"] });
      setEditing(false);
    } catch {
      setError("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen scroll>
      {/* Header */}
      <Text style={styles.title}>Your profile</Text>
      <Text style={styles.subtitle}>
        Keep your details up to date
      </Text>

      {/* Profile card */}
      <View style={styles.card}>
        {/* Name */}
        <Text style={styles.label}>Full name</Text>
        {editing ? (
          <Input
            value={fullName}
            onChangeText={setFullName}
            placeholder="Your full name"
          />
        ) : (
          <Text style={styles.value}>
            {data.fullName || "Not provided"}
          </Text>
        )}

        {/* Phone */}

        <Text style={styles.label}>Phone</Text>
        <Text style={styles.value}>{data.phone}</Text>

        {/* Email */}
        <Text style={styles.label}>Email</Text>
        {editing ? (
          <Input
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            keyboardType="email-address"
          />
        ) : (
          <Text style={styles.value}>
            {data.email || "Not provided"}
          </Text>
        )}
      </View>

      {/* Status */}
      <Text style={styles.status}>
        Profile status:{" "}
        <Text
          style={{
            color: data.profileDone
              ? colors.success
              : colors.warning,
            fontWeight: "600",
          }}
        >
          {data.profileDone ? "Complete" : "Incomplete"}
        </Text>
      </Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {/* Primary CTA */}
      {editing ? (
        <Button
          title="Save changes"
          onPress={saveProfile}
          loading={loading}
        />
      ) : (
        <Button
          title="Edit profile"
          onPress={() => setEditing(true)}
        />
      )}

      {/* Logout (separated) */}
      <View style={styles.logoutWrap}>
        <Text onPress={signOut} style={styles.logout}>
          Log out
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    ...typography.h2,
    marginBottom: spacing.xs,
  },

  subtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },

  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },

  label: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },

  value: {
    ...typography.body,
    marginTop: spacing.xs,
  },

  status: {
    ...typography.body,
    marginBottom: spacing.md,
  },

  logoutWrap: {
    marginTop: spacing.xl,
    alignItems: "center",
  },

  logout: {
    color: colors.danger,
    fontWeight: "600",
  },

  error: {
    color: colors.danger,
    marginBottom: spacing.sm,
    ...typography.body,
  },
});

