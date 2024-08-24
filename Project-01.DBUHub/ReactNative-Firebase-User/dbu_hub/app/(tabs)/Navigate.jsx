import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, FlatList, Text, TouchableOpacity, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import GoBack from '../../components/GoBack';
import SearchComponent from '../../components/SearchComponent';

const { width, height } = Dimensions.get('window');

// Predefined list of places with their coordinates
const PLACES = [
  { id: '1', name: 'Academic Record Center', latitude: 9.658009507123426, longitude: 39.52214520889196 },
  { id: '2', name: 'College of Law', latitude: 9.658559498853908, longitude: 39.52261727765654 },
  { id: '3', name: 'Student Cafe', latitude: 9.65573991600698, longitude: 39.523467709807264 },
  { id: '4', name: 'DBU Stadium', latitude: 9.653830953999734, longitude: 39.52256754496158 },
  { id: '5', name: 'Debre Birhan University Health Science Campus', latitude: 9.669594840318977, longitude: 39.53298007027464 },
  { id: '6', name: 'Postgraduate College Building', latitude: 9.660495039586731, longitude: 39.52203091596183 },
  { id: '7', name: 'Debre Berhan University', latitude: 9.657000942554573, longitude: 39.52540656578363 },
  { id: '8', name: "Teacher's Cafe", latitude: 9.657408022844324, longitude: 39.522012487092475 },
  { id: '9', name: 'College of Computing', latitude: 9.658769381304031, longitude: 39.52215260254309 },
  { id: '10', name: "President's Office", latitude: 9.65803720884416, longitude: 39.521909910795166 },
  { id: '11', name: "Men's Lounge", latitude: 9.655278857788488, longitude: 39.521784057168006 },
  { id: '12', name: 'Administrative Building', latitude: 9.659706142013057, longitude: 39.52029454361376 },
];

const Navigate = () => {
  const [searchQuery, setSearchQuery] = useState(''); // State to store the search query
  const [mapRegion, setMapRegion] = useState({ // Initial map region (centered on DBU)
    latitude: 9.656983685945331,
    longitude: 39.52141543884528,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [currentLocation, setCurrentLocation] = useState(null); // State to store user's current location
  const [hasLocationPermission, setHasLocationPermission] = useState(false); // State to track location permission
  const [filteredPlaces, setFilteredPlaces] = useState(PLACES); // State to store filtered places based on search

  // Request location permission and get user's current location
  useEffect(() => {
    const getLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        setHasLocationPermission(true);
        const location = await Location.getCurrentPositionAsync({});
        setCurrentLocation(location.coords);
        setMapRegion({
          ...mapRegion,
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } else {
        setHasLocationPermission(false);
      }
    };

    getLocationPermission();
  }, []);

  // Filter places based on the search query
  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const result = PLACES.filter(place => place.name.toLowerCase().includes(query));
    setFilteredPlaces(result);
  }, [searchQuery]);

  // Handle the search action and update the map region
  const handleSearch = () => {
    if (filteredPlaces.length > 0) {
      setMapRegion({
        latitude: filteredPlaces[0].latitude,
        longitude: filteredPlaces[0].longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };

  // Handle place selection from the search results
  const onSelectPlace = (place) => {
    setMapRegion({
      latitude: place.latitude,
      longitude: place.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
    setSearchQuery(place.name);
    setFilteredPlaces([]);
  };

  // Move the map to the user's current location
  const handleCurrentLocation = async () => {
    if (hasLocationPermission && currentLocation) {
      setMapRegion({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };

  // Render each place item in the list
  const renderPlaceItem = ({ item }) => (
    <TouchableOpacity style={styles.placeItem} onPress={() => onSelectPlace(item)}>
      <Text style={styles.placeName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Go back button */}
      <GoBack style={styles.goBackButton} />

      {/* Search component */}
      <View style={styles.searchContainer}>
        <SearchComponent
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          filteredPlaces={filteredPlaces}
          onSelectPlace={onSelectPlace}
        />
      </View>

      {/* FlatList to display filtered places */}
      <FlatList
        data={filteredPlaces}
        renderItem={renderPlaceItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.placesList}
        contentContainerStyle={styles.placesListContent}
      />

      {/* MapView to display the map */}
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={false}
        region={mapRegion}
        customMapStyle={mapStyle}
      >
        {/* Show user's current location with a marker and circle */}
        {currentLocation && (
          <>
            <Marker
              coordinate={{ latitude: currentLocation.latitude, longitude: currentLocation.longitude }}
              title=""
            >
              <View style={styles.currentLocationMarker} />
            </Marker>
            <Circle
              center={{ latitude: currentLocation.latitude, longitude: currentLocation.longitude }}
              radius={1000}
              strokeColor="rgba(0, 180, 255, 0.5)"
              fillColor="rgba(0, 180, 255, 0.2)"
            />
          </>
        )}

        {/* Display markers for each filtered place */}
        {filteredPlaces.map(place => (
          <Marker
            key={place.id}
            coordinate={{ latitude: place.latitude, longitude: place.longitude }}
            title={place.name}
            pinColor="#03bafc"
          />
        ))}

        {/* Specific markers for university buildings */}
        <Marker
          coordinate={{ latitude: 9.656983685945331, longitude: 39.52141543884528 }}
          title="Debre Birhan University"
          description="University Location"
        >
          <Image
            source={require('../../assets/images/debre-birhan-university.png')}
            style={styles.universityMarker}
          />
        </Marker>
        <Marker
          coordinate={{ latitude: 9.669594840318977, longitude: 39.53298007027464 }}
          title="Health Science Campus"
        >
          <Image
            source={require('../../assets/images/health.png')}
            style={styles.universityMarker}
          />
        </Marker>
      </MapView>

      {/* Button to center map on user's current location */}
      <TouchableOpacity style={styles.currentLocationButton} onPress={handleCurrentLocation}>
        <Text style={styles.currentLocationButtonText}>My Location</Text>
      </TouchableOpacity>
    </View>
  );
};

// Map custom style configuration
const mapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#e0f7fa' }] },
  { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#00796b' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#b2dfdb' }] },
  { featureType: 'administrative.land_parcel', elementType: 'labels', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#ffffff' }] },
  { featureType: 'road.arterial', elementType: 'labels', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#b2dfdb' }] },
];

// Stylesheet for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f4f8',
  },
  goBackButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 10,
  },
  searchContainer: {
    position: 'absolute',
    top: 60,
    width: width * 0.9,
    zIndex: 10,
  },
  placesList: {
    position: 'absolute',
    top: 110,
    zIndex: 10,
    maxHeight: 100,
  },
  placesListContent: {
    paddingHorizontal: 10,
  },
  placeItem: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  placeName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00796b',
  },
  map: {
    width: width,
    height: height,
  },
  currentLocationMarker: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: '#007aff',
    borderWidth: 2,
    borderColor: '#fff',
  },
  universityMarker: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  currentLocationButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#007aff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  currentLocationButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Navigate;
