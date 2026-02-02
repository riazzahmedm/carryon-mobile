import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { colors, spacing, typography } from "../theme";

type Item = {
  id: string;     // categoryId OR airportCode
  label: string;  // display label
};

type Props = {
  visible: boolean;
  title: string;
  items: Item[];
  onSelect: (item: Item) => void;
  onClose: () => void;
};

export function SelectModal({
  visible,
  title,
  items,
  onSelect,
  onClose,
}: Props) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>

          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                <Text style={styles.itemText}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancel}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  container: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: "70%",
  },

  title: {
    ...typography.title,
    marginBottom: spacing.md,
  },

  item: {
    paddingVertical: spacing.md,
  },

  itemText: {
    ...typography.body,
  },

  cancel: {
    marginTop: spacing.lg,
    textAlign: "center",
    color: colors.danger,
    fontWeight: "600",
  },
});
