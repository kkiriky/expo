import React from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';

const TitleLoader = () => {
  return (
    <ContentLoader height={24} speed={1} viewBox="0 0 380 24">
      <Rect x="0" y="0" rx="4" ry="4" width="60" height="24" />
    </ContentLoader>
  );
};

export default TitleLoader;
