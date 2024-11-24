import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function FullScreenMap() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }} title="Restaurant" />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
