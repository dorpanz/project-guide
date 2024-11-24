import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Us</Text>
      <Text style={styles.content}>
        Welcome to the Restaurant Finder App! This app helps you explore and manage your favorite
        restaurants with ease. Search, review, and navigate effortlessly.
      </Text>
      <Text style={styles.subTitle}>Team Members:</Text>
      <Text style={styles.teamMember}>1. Daria Ignateva</Text>
      <Text style={styles.teamMember}>2. Roda Issa</Text>
      <Text style={styles.teamMember}>3. Manya Khullar</Text>
      <Text style={styles.teamMember}>3. Liubov Uchamprina</Text>
    </View>
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
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  teamMember: {
    fontSize: 16,
    marginBottom: 5,
  },
});
