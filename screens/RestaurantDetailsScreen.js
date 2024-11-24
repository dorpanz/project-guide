import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function RestaurantDetailsScreen({ route, navigation }) {
  const { restaurant } = route.params;

  const [reviews, setReviews] = useState([
    { id: 1, text: 'Great food and ambiance!', rating: 5 },
    { id: 2, text: 'Service was a bit slow, but overall nice.', rating: 3 },
  ]);

  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState('');

  const addReview = () => {
    if (newReview && newRating) {
      const newEntry = {
        id: Date.now(),
        text: newReview,
        rating: parseInt(newRating, 10),
      };
      setReviews([...reviews, newEntry]);
      setNewReview('');
      setNewRating('');
    }
  };

  const removeReview = (id) => {
    setReviews(reviews.filter((review) => review.id !== id));
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
        initialRegion={{
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
      <Button title="Add Review" onPress={addReview} color="#FF69B4" />

      <Button
        title="Get Directions"
        onPress={() => alert('Opening navigation app...')}
        color="#FFA07A"
      />
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
});
