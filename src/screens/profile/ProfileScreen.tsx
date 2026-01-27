import { useState, useEffect } from "react";
import { Text, StyleSheet } from "react-native";
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

  // Initialize form when data loads
  useEffect(() => {
    if (data) {
      setFullName(data.fullName || "");
      setEmail(data.email || "");
      setEditing(!data.profileDone); // 👈 auto-edit if incomplete
    }
  }, [data]);

  if (isLoading) {
    return (
      <Screen>
        <Text>Loading profile...</Text>
      </Screen>
    );
  }

  if (isError || !data) {
    return (
      <Screen>
        <Text style={styles.error}>Failed to load profile</Text>
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
    <Screen>
      <Text style={styles.title}>Profile</Text>

      {/* Name */}
      <Text style={styles.label}>Name</Text>
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

      {/* Phone (always read-only) */}
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
          title="Save profile"
          onPress={saveProfile}
          loading={loading}
        />
      ) : (
        <Button
          title="Edit profile"
          onPress={() => setEditing(true)}
        />
      )}

      {/* Logout */}
      <Text style={styles.spacer} />
      <Text onPress={signOut} style={styles.logout}>
        Logout
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    ...typography.title,
    marginBottom: spacing.lg,
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
    marginTop: spacing.lg,
    ...typography.body,
  },

  spacer: {
    marginTop: spacing.xl,
  },

  logout: {
    color: colors.danger,
    fontWeight: "600",
    textAlign: "center",
    marginTop: spacing.md,
  },

  error: {
    color: colors.danger,
    marginTop: spacing.sm,
    ...typography.body,
  },
});
