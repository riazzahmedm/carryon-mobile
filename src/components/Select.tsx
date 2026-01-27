import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { colors, spacing } from "../theme";

type Option = {
  label: string;
  value: string;
};

type Props = {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
};

export function Select({ value, options, onChange }: Props) {
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={value}
        onValueChange={onChange}
      >
        <Picker.Item label="Select category" value="" />
        {options.map((opt) => (
          <Picker.Item
            key={opt.value}
            label={opt.label}
            value={opt.value}
          />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    overflow: "hidden",
  },
});
