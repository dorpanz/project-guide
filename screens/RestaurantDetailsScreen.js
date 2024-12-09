import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
  Linking,
  PermissionsAndroid,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RestaurantDetailsScreen({ route, navigation }) {
  const { restaurant: initialRestaurant } = route.params;

  const [restaurant, setRestaurant] = useState(initialRestaurant);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState('');

  useEffect(() => {
    const loadUpdatedRestaurant = async () => {
      try {
        const storedRestaurants = await AsyncStorage.getItem('restaurantDetails');
        if (storedRestaurants) {
          const updatedRestaurant = JSON.parse(storedRestaurants).find(
            (r) => r.id === initialRestaurant.id
          );
          if (updatedRestaurant) {
            setRestaurant(updatedRestaurant);
          }
        }
      } catch (error) {
        console.error('Failed to load updated restaurant:', error);
      }
    };
  
    loadUpdatedRestaurant();
  }, []);
  

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const savedReviews = await AsyncStorage.getItem(`reviews_${restaurant.id}`);
        if (savedReviews) {
          setReviews(JSON.parse(savedReviews));
        }
      } catch (error) {
        console.error('Failed to load reviews:', error);
      }
    };
    fetchReviews();
  }, [restaurant.id]);

  const saveReviews = async (newReviews) => {
    try {
      await AsyncStorage.setItem(`reviews_${restaurant.id}`, JSON.stringify(newReviews));
      setReviews(newReviews);
    } catch (error) {
      console.error('Failed to save reviews:', error);
    }
  };

  const addReview = () => {
    if (!newReview || !newRating) {
      Alert.alert('Validation Error', 'Please fill both review and rating fields.');
      return;
    }

    const rating = parseInt(newRating, 10);
    if (isNaN(rating) || rating < 1 || rating > 5) {
      Alert.alert('Validation Error', 'Rating must be a number between 1 and 5.');
      return;
    }

    const newEntry = {
      id: Date.now(),
      text: newReview.trim(),
      rating,
    };

    const updatedReviews = [...reviews, newEntry];
    saveReviews(updatedReviews);

    setNewReview('');
    setNewRating('');
  };

  const removeReview = (id) => {
    const updatedReviews = reviews.filter((review) => review.id !== id);
    saveReviews(updatedReviews);
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permission Denied', 'Location permission is required to get directions.');
        return false;
      }
    }
    return true;
  };

  const getDirections = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return;

    const { latitude, longitude } = restaurant;
    const url = Platform.OS === 'ios'
      ? `http://maps.apple.com/?daddr=${latitude},${longitude}`
      : `google.navigation:q=${latitude},${longitude}`;

    Linking.openURL(url).catch((err) => {
      Alert.alert('Error', 'Unable to open directions.');
      console.error(err);
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{restaurant.name}</Text>
      <Text style={styles.info}>📍 {restaurant.address}</Text>
      <Text style={styles.info}>📞 {restaurant.phone}</Text>
      <Text style={styles.info}>📋 {restaurant.description}</Text>
      <View style={styles.tagContainer}>
        {restaurant.tags.map((tag, index) => (
          <Text key={index} style={styles.tag}>
            {tag}
          </Text>
        ))}
      </View>

      <MapView
        style={styles.map}
        region={{
          latitude: restaurant.latitude,
          longitude: restaurant.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: restaurant.latitude,
            longitude: restaurant.longitude,
          }}
          title={restaurant.name}
        />
      </MapView>

      <Text style={styles.sectionTitle}>Reviews</Text>
      {reviews.map((review) => (
        <View key={review.id} style={styles.review}>
          <Text>{review.text}</Text>
          <Text>Rating: {review.rating}⭐</Text>
          <TouchableOpacity onPress={() => removeReview(review.id)}>
            <Text style={styles.deleteButton}>Delete</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TextInput
        style={styles.input}
        placeholder="Write a review..."
        value={newReview}
        onChangeText={setNewReview}
      />
      <TextInput
        style={styles.input}
        placeholder="Rating (1-5)"
        keyboardType="numeric"
        value={newRating}
        onChangeText={setNewRating}
      />
      <TouchableOpacity style={styles.addButton} onPress={addReview}>
        <Text style={styles.addButtonText}>Add Review</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.directionsButton} onPress={getDirections}>
        <Text style={styles.directionsButtonText}>Get Directions</Text>
      </TouchableOpacity>

      {/* Edit Button */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={() =>
          navigation.navigate('AddRestaurant', { restaurant, onSave: (updatedRestaurant) => {
            setRestaurant(updatedRestaurant); 
          } })
        }
      >
        <Text style={styles.editButtonText}>Edit Restaurant</Text>
      </TouchableOpacity>


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF8F0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  tag: {
    backgroundColor: '#FF69B4',
    color: '#FFF',
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  map: {
    width: '100%',
    height: 200,
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  review: {
    backgroundColor: '#FFF',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  deleteButton: {
    color: 'red',
    marginTop: 5,
  },
  input: {
    backgroundColor: '#FFF',
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#FF69B4',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  directionsButton: {
    backgroundColor: '#FFA07A',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15,
  },
  directionsButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Edit Button Styles
  editButton: {
    backgroundColor: '#a3b18a',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  editButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
