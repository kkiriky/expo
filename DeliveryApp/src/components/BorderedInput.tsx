import {
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  StyleSheet,
  TextInput,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {colors} from '@/common/constants/colors';
import globalStyles from '@/styles/globalStyles';

interface BorderedInputProps {
  placeholder: string;
  value: string;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
  onSubmitEditing: () => void;
  hasMarginBottom?: boolean;
  keyboardType?: KeyboardTypeOptions;
  returnKeyType: ReturnKeyTypeOptions;
  secureTextEntry?: boolean;
  isError: boolean;
}

const BorderedInput = React.forwardRef<TextInput, BorderedInputProps>(
  ({hasMarginBottom, isError, ...rest}, ref) => {
    const [focused, setFocused] = useState(false);

    const onFocus = useCallback(() => setFocused(true), []);
    const onBlur = useCallback(() => setFocused(false), []);

    return (
      <TextInput
        style={[
          styles.input,
          hasMarginBottom && styles.marginBottom,
          focused && styles.focused,
          isError && globalStyles.errorBorder,
        ]}
        placeholderTextColor={colors.bodyText}
        cursorColor={colors.primary} // android
        selectionColor={colors.primary}
        autoCapitalize="none"
        autoCorrect={false}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={ref}
        {...rest}
      />
    );
  },
);

export default BorderedInput;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: colors.inputBorder,
    backgroundColor: colors.inputBackground,
    borderRadius: 8,
    height: 48,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  marginBottom: {
    marginBottom: 16,
  },
  focused: {
    borderColor: colors.primary,
  },
});
