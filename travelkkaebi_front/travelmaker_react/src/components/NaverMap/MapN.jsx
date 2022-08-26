import React from 'react';
import { NaverMap, RenderAfterNavermapsLoaded } from 'react-naver-maps';

const MapN = () => {
  return (
    <NaverMap 
      id='maps-examples-map-simple'
      style={{
        width: '100%',
        height: '600px',

      }}
      
    />
  )
};

export default MapN;