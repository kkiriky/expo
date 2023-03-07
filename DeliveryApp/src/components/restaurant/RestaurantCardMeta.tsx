import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import globalStyles from '@/styles/globalStyles';
import {colors} from '@/common/constants/colors';

interface RestaurantCardMetaProps {
  iconName: keyof typeof MaterialIcons.glyphMap;
  text: string | number;
}

const RestaurantCardMeta = ({iconName, text}: RestaurantCardMetaProps) => {
  return (
    <View style={[globalStyles.row, styles.meta]}>
      <MaterialIcons name={iconName} size={16} color={colors.primary} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default RestaurantCardMeta;

const styles = StyleSheet.create({
  meta: {
    gap: 4,
  },
  text: {
    fontSize: 12,
  },
});
