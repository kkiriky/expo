import React from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';

const createRandomValue = () => Math.floor(Math.random() * 100) + 250;

const DetailLoader = () => (
  <ContentLoader
    height={94}
    speed={1}
    viewBox="0 0 380 94" // <min-x> <min-y> <width> <height>
  >
    <Rect x="0" y="0" rx="4" ry="4" width={createRandomValue()} height="14" />
    <Rect x="0" y="20" rx="4" ry="4" width={createRandomValue()} height="14" />
    <Rect x="0" y="40" rx="4" ry="4" width={createRandomValue()} height="14" />
    <Rect x="0" y="60" rx="4" ry="4" width={createRandomValue()} height="14" />
    <Rect x="0" y="80" rx="4" ry="4" width={createRandomValue()} height="14" />
  </ContentLoader>
);
export default DetailLoader;
