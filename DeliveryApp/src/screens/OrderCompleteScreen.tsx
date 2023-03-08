import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomButton from '@/components/CustomButton';
import globalStyles from '@/styles/globalStyles';
import {RootStackScreenProps} from '@/routes/routes.types';

const OrderCompleteScreen = ({
  navigation,
}: RootStackScreenProps<'OrderComplete'>) => {
  return (
    <View style={styles.layout}>
      <Text style={styles.text}>주문이 완료되었습니다</Text>
      <CustomButton
        text="주문 내역 보러가기"
        onPress={() => navigation.push('MainTab', {screen: 'Orders'})}
        isLoading={false}
        height={36}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    ...globalStyles.full,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default OrderCompleteScreen;
