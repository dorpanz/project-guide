import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StyleSheet,
} from 'react-native';
import { CreateRestaurant } from './CreateRestaurant';
import { UpdateRestaurant } from './UpdateRestaurant';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDCWhb7RdBMQl--hPUJnxeanVI-KIeuPhM';

export default function AddEditRestaurantScreen({ navigation, route }) {
  const isEdit = !!route.params?.restaurant;
  const initialRestaurant = route.params?.restaurant || {
    name: '',
    address: '',
    phone: '',
    description: '',
    tags: [],
  };

  const [tags, setTags] = useState(initialRestaurant.tags || []);
  const [newTag, setNewTag] = useState('');
  const [restaurantDetails, setRestaurantDetails] = useState(initialRestaurant);

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags((prev) => [...prev, newTag.trim()]);
      setNewTag('');
    }
  };

  const deleteTag = (tag) => {
    setTags((prevTags) => prevTags.filter((item) => item !== tag));
  };

  const saveRestaurant = async () => {
    if (!restaurantDetails.name || !restaurantDetails.address || !restaurantDetails.phone) {
      Alert.alert('Validation Error', 'Please fill in all required fields (Name, Address, Phone).');
      return;
    }
  
    try {
      const savedRestaurant = isEdit
        ? await UpdateRestaurant(restaurantDetails, tags, initialRestaurant, GOOGLE_MAPS_API_KEY)
        : await CreateRestaurant(restaurantDetails, tags, GOOGLE_MAPS_API_KEY);
  
      if (isEdit && route.params?.onSave) {
        route.params.onSave(savedRestaurant);
      }
  
      const restaurants = await AsyncStorage.getItem('restaurantDetails');
      const parsedRestaurants = restaurants ? JSON.parse(restaurants) : [];
  
      let updatedRestaurants;
      if (isEdit) {
        updatedRestaurants = parsedRestaurants.map((r) =>
          r.id === savedRestaurant.id ? savedRestaurant : r
        );
      } else {
        // Check if the restaurant already exists to avoid duplication
        const isDuplicate = parsedRestaurants.some(r => r.id === savedRestaurant.id);
        if (!isDuplicate) {
          updatedRestaurants = [...parsedRestaurants, savedRestaurant];
        } else {
          updatedRestaurants = parsedRestaurants; // Do nothing if it's a duplicate
        }
      }
  
      await AsyncStorage.setItem('restaurantDetails', JSON.stringify(updatedRestaurants));
      navigation.navigate('RestaurantList', { refresh: true });
    } catch (error) {
      console.log('Error saving restaurant:', error);
      Alert.alert('Error', 'There was an issue saving the restaurant. Please try again.');
    }
  };
  
  const deleteRestaurant = async () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this restaurant?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const restaurants = await AsyncStorage.getItem('restaurantDetails');
              const parsedRestaurants = restaurants ? JSON.parse(restaurants) : [];

              const updatedRestaurants = parsedRestaurants.filter(
                (restaurant) => restaurant.id !== restaurantDetails.id
              );

              await AsyncStorage.setItem('restaurantDetails', JSON.stringify(updatedRestaurants));
              navigation.navigate('RestaurantList', { refresh: true });
            } catch (error) {
              console.log('Error deleting restaurant:', error);
              Alert.alert('Error', 'There was an issue deleting the restaurant. Please try again.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TextInput
        placeholder="Restaurant Name"
        style={styles.input}
        value={restaurantDetails.name}
        onChangeText={(text) => setRestaurantDetails({ ...restaurantDetails, name: text })}
      />
      <TextInput
        placeholder="Address"
        style={styles.input}
        value={restaurantDetails.address}
        onChangeText={(text) => setRestaurantDetails({ ...restaurantDetails, address: text })}
      />
      <TextInput
        placeholder="Phone"
        style={styles.input}
        value={restaurantDetails.phone}
        onChangeText={(text) => setRestaurantDetails({ ...restaurantDetails, phone: text })}
        keyboardType="phone-pad"
      />
      <TextInput
        placeholder="Description"
        style={styles.input}
        value={restaurantDetails.description}
        onChangeText={(text) => setRestaurantDetails({ ...restaurantDetails, description: text })}
        multiline
      />
      <View style={styles.tagContainer}>
        <TextInput
          placeholder="Add a Tag"
          style={[styles.input, { flex: 1 }]}
          value={newTag}
          onChangeText={setNewTag}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTag}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tags}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.tagItem}>
            <Text style={styles.tag}>{item}</Text>
            <TouchableOpacity onPress={() => deleteTag(item)} style={styles.deleteTagButton}>
              <Text style={styles.deleteTagText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        horizontal
      />
      <TouchableOpacity style={styles.saveButton} onPress={saveRestaurant}>
        <Text style={styles.saveButtonText}>{isEdit ? 'Update' : 'Save'} Restaurant</Text>
      </TouchableOpacity>

      {isEdit && (
        <TouchableOpacity style={styles.deleteButton} onPress={deleteRestaurant}>
          <Text style={styles.deleteButtonText}>Delete Restaurant</Text>
        </TouchableOpacity>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF8F0',
  },
  input: {
    backgroundColor: '#FFF',
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: '#FF69B4',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#76c893',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tagItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  tag: {
    backgroundColor: '#FF69B4',
    color: '#FFF',
    paddingVertical: 10, 
    paddingHorizontal: 10, 
    borderRadius: 5,
    marginRight: 8,
    marginBottom: 8, 
    fontSize: 12, 
    maxWidth: 120, 
  },
  deleteTagButton: {
    backgroundColor: '#f25c54',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 0,
  },
  deleteTagText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#f25c54', 
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  deleteButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
