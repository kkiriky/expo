import {StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
  full: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorMessage: {
    fontSize: 12,
    color: 'red',
    marginVertical: 4,
    marginLeft: 8,
    lineHeight: 16,
  },
  errorBorder: {
    borderWidth: 1,
    borderColor: 'red',
  },
});

export default globalStyles;
