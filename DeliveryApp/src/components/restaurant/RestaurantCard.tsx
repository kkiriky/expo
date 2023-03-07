import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {colors} from '@/common/constants/colors';
import globalStyles from '@/styles/globalStyles';
import RestaurantCardMeta from './RestaurantCardMeta';
import {Restaurant} from '@/api/restaurants/restaurantsApi.types';
import {baseURL} from '@/api';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard = ({restaurant}: RestaurantCardProps) => {
  return (
    <View>
      <Image
        source={{uri: `${baseURL}${restaurant.thumbUrl}`}}
        style={styles.image}
      />
      <Text style={styles.title}>{restaurant.name}</Text>
      <Text style={styles.tags}>{restaurant.tags.join('·')}</Text>

      <View style={[globalStyles.row, styles.metaContainer]}>
        <RestaurantCardMeta iconName="star" text={restaurant.ratings} />
        <Text>·</Text>
        <RestaurantCardMeta iconName="receipt" text={restaurant.ratingsCount} />
        <Text>·</Text>
        <RestaurantCardMeta
          iconName="timelapse"
          text={restaurant.deliveryTime}
        />
        <Text>·</Text>
        <RestaurantCardMeta
          iconName="monetization-on"
          text={restaurant.deliveryFee}
        />
      </View>
    </View>
  );
};

export default RestaurantCard;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 240,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 4,
  },
  tags: {
    color: colors.bodyText,
    marginBottom: 4,
  },
  metaContainer: {
    gap: 8,
  },
  meta: {
    gap: 4,
  },
});
