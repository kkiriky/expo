import React from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';

const OrderLoader = () => {
  return (
    <ContentLoader height={70} speed={1} viewBox="0 0 410 70">
      <Rect x="0" y="0" rx="4" ry="4" width="120" height="16" />
      <Rect x="0" y="20" rx="8" ry="8" width="48" height="48" />
      <Rect x="60" y="28" rx="4" ry="4" width="100" height="16" />
      <Rect x="60" y="48" rx="4" ry="4" width="160" height="16" />
    </ContentLoader>
  );
};

export default OrderLoader;
