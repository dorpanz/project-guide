import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';

export default function AddEditRestaurantScreen() {
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [restaurantDetails, setRestaurantDetails] = useState({
    name: '',
    address: '',
    phone: '',
    description: '',
  });

  const addTag = () => {
    if (newTag.trim()) {
      setTags((prev) => [...prev, newTag]);
      setNewTag('');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
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
        placeholder="Phone (e.g. +1234567890)"
        style={styles.inputPhone}
        value={restaurantDetails.phone}
        onChangeText={(text) => setRestaurantDetails({ ...restaurantDetails, phone: text })}
        keyboardType="phone-pad" // Ensures the phone pad is shown
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
          style={styles.inputTag}
          value={newTag}
          onChangeText={setNewTag}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTag}>
          <Text style={styles.addButtonText}>+ Tag</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tags}
        renderItem={({ item }) => <Text style={styles.tag}>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        style={styles.tagList}
      />

      <TouchableOpacity style={styles.saveButton} onPress={() => {}}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
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
    borderWidth: 1,
    borderColor: '#F4A6C6',
    borderRadius: 20,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#FFF',
    fontSize: 16,
  },
  inputPhone: {
    borderWidth: 1,
    borderColor: '#F4A6C6',
    borderRadius: 20,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#FFF',
    fontSize: 16,
    keyboardType: 'phone-pad', 
  },
  inputTag: {
    borderWidth: 1,
    borderColor: '#F4A6C6',
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#FFF',
    fontSize: 16,
    width: 150,
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  tagList: {
    marginBottom: 15,
    maxHeight: 40, 
  },
  tag: {
    backgroundColor: '#FF69B4',
    color: '#FFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    fontSize: 14,
  },
  addButton: {
    backgroundColor: '#FF69B4',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#FF69B4',
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
