import React from 'react';
import ContentLoader from 'react-content-loader';

const SkeletonLoading = () => {
  return (
    <>
      <ContentLoader
        speed={2}
        width={720}
        height={768}
        viewBox="0 0 720 788"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="394" y="170" rx="0" ry="0" width="0" height="1" />
        <rect x="30" y="1" rx="0" ry="0" width="720" height="788" />
      </ContentLoader>
      <ContentLoader
        speed={2}
        width={567}
        height={768}
        viewBox="0 0 567 768"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="394" y="170" rx="0" ry="0" width="0" height="1" />
        <rect x="38" y="29" rx="0" ry="0" width="522" height="43" />
        <circle cx="89" cy="160" r="66" />
        <rect x="160" y="108" rx="0" ry="0" width="91" height="21" />
        <rect x="161" y="140" rx="0" ry="0" width="122" height="21" />
        <rect x="30" y="240" rx="0" ry="0" width="517" height="389" />
        <rect x="257" y="348" rx="0" ry="0" width="1" height="13" />
        <rect x="30" y="675" rx="0" ry="0" width="516" height="32" />
        <rect x="28" y="726" rx="0" ry="0" width="516" height="30" />
        <rect x="431" y="108" rx="0" ry="0" width="91" height="21" />
        <rect x="432" y="140" rx="0" ry="0" width="122" height="21" />
      </ContentLoader>
    </>
  );
};

export default SkeletonLoading;
