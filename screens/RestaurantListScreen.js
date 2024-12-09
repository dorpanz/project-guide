import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const dummyLocations = [
  { id: '1', name: 'Pasta Palace', address: '123 Pasta Street', latitude: 43.642422, longitude: -79.377159, tags: ['Italian', 'Pasta'] },
  { id: '2', name: 'Vegan Delight', address: '456 Green Way', latitude: 43.78925, longitude: -79.4224, tags: ['Vegan', 'Healthy'] },
];

export default function RestaurantListScreen({ navigation, route }) {
  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const loadRestaurants = async () => {
    try {
      const storedRestaurants = await AsyncStorage.getItem('restaurantDetails');
      const parsedRestaurants = storedRestaurants ? JSON.parse(storedRestaurants) : [];
      
      
      const combinedRestaurants = [...dummyLocations, ...parsedRestaurants];

      setRestaurants(combinedRestaurants);
      setFilteredRestaurants(combinedRestaurants); 
    } catch (error) {
      console.error('Failed to load restaurants:', error);
    }
  };

  useEffect(() => {
    loadRestaurants();
  }, []);

  useEffect(() => {
    if (route.params?.refresh) {
      loadRestaurants();  
    }
  }, [route.params?.refresh]);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filteredData = restaurants.filter((restaurant) => {
      const nameMatch = restaurant.name.toLowerCase().includes(text.toLowerCase());
      const tagsMatch = restaurant.tags.some((tag) =>
        tag.toLowerCase().includes(text.toLowerCase())
      );
      return nameMatch || tagsMatch;
    });
    setFilteredRestaurants(filteredData);
  };

  const handleAddRestaurant = (newRestaurant) => {
    const updatedRestaurants = [...restaurants, newRestaurant];
    setRestaurants(updatedRestaurants);
    setFilteredRestaurants(updatedRestaurants); 
    AsyncStorage.setItem('restaurantDetails', JSON.stringify(updatedRestaurants));
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#FFF0F5' }}>
      
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name or tags"
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <FlatList
        data={filteredRestaurants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Details', { restaurant: item })}
            style={styles.item}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.address}>{item.address}</Text>
            <View style={styles.tagContainer}>
              {item.tags.map((tag, index) => (
                <Text key={index} style={styles.tag}>
                  {tag}
                </Text>
              ))}
            </View>
          </TouchableOpacity>
        )}
      />

      
      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          navigation.navigate('AddRestaurant', {
            onSave: handleAddRestaurant, 
          })
        }
      >
        <Text style={styles.addButtonText}>+ Add Restaurant</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    borderWidth: 1,
    borderColor: '#FFC0CB',
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#FFF',
    fontSize: 16,
  },
  item: {
    padding: 20,
    marginBottom: 15,
    borderRadius: 15,
    backgroundColor: '#FFE4E1',
    borderWidth: 1,
    borderColor: '#FFC0CB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF69B4',
    fontFamily: 'Comic Sans MS',
    marginBottom: 5,
  },
  address: {
    fontSize: 16,
    color: '#FF6347',
    fontFamily: 'Arial',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  tag: {
    backgroundColor: '#FF69B4',
    color: '#FFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    fontSize: 14,
  },
  addButton: {
    backgroundColor: '#FF69B4',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 20,
    alignSelf: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
