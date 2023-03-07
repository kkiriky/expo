import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import globalStyles from '@/styles/globalStyles';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {colors} from '@/common/constants/colors';
import {Review} from '@/api/restaurants/restaurantsApi.types';
import {baseURL} from '@/api';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard = ({review}: ReviewCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image
          style={styles.profileImg}
          source={{uri: `${baseURL}${review.user.imageUrl}`}}
        />
        <Text style={styles.email} numberOfLines={1} ellipsizeMode="tail">
          {review.user.username}
        </Text>

        <View style={globalStyles.full} />

        {[...Array(5)].map((_, i) => {
          if (i < review.rating) {
            return (
              <MaterialIcons
                key={i}
                name="star"
                color={colors.primary}
                size={16}
              />
            );
          }

          return (
            <MaterialIcons
              key={i}
              name="star-outline"
              color={colors.primary}
              size={16}
            />
          );
        })}
      </View>
      <Text
        style={[
          styles.review,
          review.imgUrls.length !== 0 && styles.marginBottom,
        ]}>
        {review.content}
      </Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={review.imgUrls}
        keyExtractor={item => item}
        ItemSeparatorComponent={Separator}
        renderItem={({item}) => (
          <Image style={styles.reveiwImg} source={{uri: `${baseURL}${item}`}} />
        )}
      />
    </View>
  );
};

const Separator = () => <View style={styles.separator} />;

export default ReviewCard;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 8,
  },
  userInfo: {
    ...globalStyles.row,
    marginBottom: 8,
  },
  profileImg: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 12,
  },
  email: {
    fontWeight: '400',
    width: 180,
  },
  review: {
    fontSize: 12,
  },
  reveiwImg: {
    width: 100,
    height: 80,
    borderRadius: 8,
  },
  separator: {
    width: 8,
  },
  marginBottom: {
    marginBottom: 8,
  },
});
