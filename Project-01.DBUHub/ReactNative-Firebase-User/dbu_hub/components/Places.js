import React from 'react';
import MapView, { Marker } from 'react-native-maps';

// Places Component to render markers on the map
const Places = ({ places }) => {
  return (
    <>
      {places?.map((place, index) => (
        <Marker
          key={index} // Unique key for each marker
          coordinate={{ latitude: place.latitude, longitude: place.longitude }}
          title={place.name}
          pinColor="#03bafc" // Color of the pin
        />
      ))}
    </>
  );
};

export default Places;
