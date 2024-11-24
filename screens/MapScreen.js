import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps'; 

export default function MapScreen() {
  const dummyLocations = [
    { id: '1', name: 'Pasta Palace', latitude: 43.642422, longitude: -79.377159 }, // Toronto Coordinates
    { id: '2', name: 'Vegan Delight', latitude: 43.78925, longitude: -79.4224 }, // Toronto Coordinates
    { id: '3', name: 'Thai Treasure', latitude: 43.67825, longitude: -79.4234 }, // Toronto Coordinates
  ];

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 43.642422, 
          longitude: -79.377159,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {dummyLocations.map((location) => (
          <Marker
            key={location.id}
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title={location.name}
          />
        ))}
      </MapView>
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
});
