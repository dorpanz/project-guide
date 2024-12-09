import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDCWhb7RdBMQl--hPUJnxeanVI-KIeuPhM'; 

export default function MapScreen() {
  const [userLocation, setUserLocation] = useState(null);
  const [restaurantDetails, setRestaurantDetails] = useState([]); // To store user-created restaurants

  // Dummy restaurant locations
  const dummyLocations = [
    { id: '1', name: 'Pasta Palace', latitude: 43.642422, longitude: -79.377159 },
    { id: '2', name: 'Vegan Delight', latitude: 43.78925, longitude: -79.4224 }
  ];

  // Function to clear old restaurant data from AsyncStorage
  const clearOldRestaurants = async () => {
    try {
      await AsyncStorage.removeItem('restaurantDetails');
      console.log('Map Updated');
      setRestaurantDetails([]); // Clear the restaurant details from state
    } catch (error) {
      console.log('Updating Map:', error);
    }
  };

  // Fetch user-created restaurants from AsyncStorage
  const loadUserRestaurants = async () => {
    try {
      const savedRestaurants = await AsyncStorage.getItem('restaurantDetails');
      if (savedRestaurants) {
        setRestaurantDetails(JSON.parse(savedRestaurants)); // Update state after loading
      }
    } catch (error) {
      console.log('Error loading user restaurants:', error);
    }
  };

  useEffect(() => {
    // Clear old data on app launch or perform a reset
    clearOldRestaurants(); // Clears old restaurant data from AsyncStorage
    loadUserRestaurants(); // Loads fresh restaurant data from AsyncStorage

    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is required');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);
    };

    getLocation();
  }, []); 

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} 
        style={styles.map}
        initialRegion={{
          latitude: userLocation ? userLocation.latitude : 43.7, 
          longitude: userLocation ? userLocation.longitude : -79.42,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Dummy Locations */}
        {dummyLocations.map((location) => (
          <Marker
            key={location.id}
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title={location.name}
          />
        ))}

        {/* User-Created Locations */}
        {restaurantDetails.map((restaurant) => (
          <Marker
            key={restaurant.id}
            coordinate={{ latitude: restaurant.latitude, longitude: restaurant.longitude }}
            title={restaurant.name}
            description={restaurant.address}
          />
        ))}

        {/* User's current location */}
        {userLocation && (
          <Marker
            coordinate={{ latitude: userLocation.latitude, longitude: userLocation.longitude }}
            title="Your Location"
            pinColor="blue"
          />
        )}
      </MapView>

      <TouchableOpacity
        style={styles.refreshButton}
        onPress={loadUserRestaurants}
      >
        <Text style={styles.refreshButtonText}>Refresh Map</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  refreshButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FF69B4',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  refreshButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
