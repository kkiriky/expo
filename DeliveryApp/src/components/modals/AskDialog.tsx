import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import globalStyles from '@/styles/globalStyles';
import {colors} from '@/common/constants/colors';

interface AskDialogProps {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
  onClose?: () => void;
  onConfirm: () => void;
}

const AskDialog = ({
  title,
  message,
  confirmText = '확인',
  cancelText = '취소',
  isDestructive,
  onClose,
  onConfirm,
}: AskDialogProps) => {
  return (
    <Modal transparent visible animationType="fade" onRequestClose={onClose}>
      <View style={styles.full}>
        <Pressable onPress={onClose} style={styles.background} />
        <View style={styles.whiteBox}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttons}>
            <Pressable
              onPress={onClose}
              hitSlop={8}
              style={({pressed}) => pressed && styles.pressed}>
              <Text style={styles.buttonText}>{cancelText}</Text>
            </Pressable>
            <View style={styles.separator} />
            <Pressable
              onPress={onConfirm}
              hitSlop={8}
              style={({pressed}) => pressed && styles.pressed}>
              <Text
                style={[
                  styles.buttonText,
                  styles.confirmText,
                  isDestructive && styles.destructive,
                ]}>
                {confirmText}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  full: {
    ...globalStyles.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  whiteBox: {
    borderRadius: 4,
    width: 320,
    paddingVertical: 24,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
    zIndex: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  message: {
    marginTop: 16,
    marginBottom: 32,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttonText: {
    fontSize: 14,
  },
  cancelText: {
    fontWeight: 'bold',
    color: '#454545',
  },
  confirmText: {
    fontWeight: 'bold',
    color: colors.primary,
  },
  destructive: {
    color: 'red',
  },
  pressed: {
    opacity: 0.75,
  },
  separator: {
    width: 16,
  },
});

export default AskDialog;
