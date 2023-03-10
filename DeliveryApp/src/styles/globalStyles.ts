import {Platform, StyleSheet} from 'react-native';

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
  shadow: {
    ...Platform.select({
      android: {
        overflow: 'hidden',
        elevation: 5,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
    }),
  },
});

export default globalStyles;
