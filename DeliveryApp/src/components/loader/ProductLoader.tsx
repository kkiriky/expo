import React from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';

const ProductLoader = () => {
  return (
    <ContentLoader height={96} speed={1} viewBox="0 0 380 96">
      <Rect x="0" y="0" rx="8" ry="8" width="96" height="96" />
      <Rect x="108" y="0" rx="4" ry="4" width="100" height="20" />
      <Rect x="108" y="24" rx="4" ry="4" width="270" height="20" />
      <Rect x="108" y="48" rx="4" ry="4" width="270" height="20" />
      <Rect x="320" y="76" rx="4" ry="4" width="60" height="20" />
    </ContentLoader>
  );
};

export default ProductLoader;
