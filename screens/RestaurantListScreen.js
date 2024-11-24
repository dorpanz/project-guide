import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

const dummyRestaurants = [
    {
      id: '1',
      name: 'Pasta Palace',
      address: '123 Main St, Toronto, ON',
      phone: '123-456-7890',
      description: 'Delicious Italian cuisine',
      tags: ['Italian', 'Family'],
      latitude: 43.642422,
      longitude: -79.377159, 
    },
    {
      id: '2',
      name: 'Vegan Delight',
      address: '456 Elm St, Toronto, ON',
      phone: '456-789-0123',
      description: 'Healthy vegan meals',
      tags: ['Vegan', 'Organic'],
      latitude: 43.78925,
      longitude: -79.4224, 
    },
  ];
  

export default function RestaurantListScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState(dummyRestaurants);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filteredData = dummyRestaurants.filter((restaurant) => {
      const nameMatch = restaurant.name.toLowerCase().includes(text.toLowerCase());
      const tagsMatch = restaurant.tags.some(tag =>
        tag.toLowerCase().includes(text.toLowerCase())
      );
      return nameMatch || tagsMatch; // Search by name or tag
    });
    setFilteredRestaurants(filteredData);
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#FFF0F5' }}>
      {/* Search Bar */}
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
      
      {/* Add Restaurant Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddRestaurant')}
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
