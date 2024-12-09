import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image 
        source={{ uri: 'https://www.restobiz.ca/wp-content/uploads/2024/09/Michelin2-777x435.jpeg' }} 
        style={styles.logo}
      />
      <Text style={styles.title}>About Us</Text>
      
      <Text style={styles.content}>
        Welcome to the Restaurant Finder App! This app helps you explore and manage your favorite
        restaurants with ease. Whether you're looking for a quick bite, a fine dining experience, or
        a family-friendly restaurant, we have something for everyone. You can search, review, and navigate 
        effortlessly to find the best places in your area.
      </Text>
      
      <Text style={styles.subTitle}>Our Mission:</Text>
      <Text style={styles.content}>
        Our mission is to create a seamless and enjoyable dining experience for everyone by providing 
        a user-friendly platform that connects food lovers with the best restaurants in their area. 
        We strive to provide accurate and up-to-date information, so you can make informed decisions on 
        where to dine.
      </Text>
      
      <Text style={styles.subTitle}>Features:</Text>
      <Text style={styles.content}>
        - Search for restaurants by name or location{"\n"}
        - View detailed information about each restaurant, including its location, tags,contact info and description.{"\n"}
        - Read and leave reviews to help others make decisions.{"\n"}
        - Get directions to restaurants and navigate there with ease.
      </Text>
      
      <Text style={styles.subTitle}>Team Members:</Text>
      <View style={styles.teamContainer}>
        <Text style={styles.teamMember}>1. Daria Ignateva</Text>
        <Text style={styles.teamMember}>2. Roda Issa</Text>
        <Text style={styles.teamMember}>3. Manya Khullar</Text>
        <Text style={styles.teamMember}>4. Liubov Uchamprina</Text>
      </View>
      
      <Image 
        source={{ uri: 'https://assets.bonappetit.com/photos/59ea6c2383b5a033fb6b9b68/4:3/w_2560%2Cc_limit/FATPASHA_LEAD_TorontoCityGuide.jpg' }} // Replace with your team image URL
        style={styles.teamPhoto}
      />
      
      <Text style={styles.content}>
        We hope you enjoy using our app and that it makes your dining experiences better. Feel free to
        reach out if you have any feedback or suggestions. We are always working to improve and add more 
        features to enhance your experience.
      </Text>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F9F4F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 5,
    borderColor: '#FFB6C1',
    shadowColor: '#FFB6C1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF69B4',
    fontFamily: 'Comic Sans MS',
    textAlign: 'center',
    textShadowColor: '#FFD700',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  content: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#4B0082',
    fontFamily: 'Arial',
    lineHeight: 28,
  },
  subTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FF6347',
    fontFamily: 'Comic Sans MS',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  teamContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  teamMember: {
    fontSize: 18,
    marginBottom: 5,
    color: '#FF6347',
    fontFamily: 'Arial',
    textAlign: 'center',
    letterSpacing: 1,
  },
  teamPhoto: {
    width: '80%',
    height: 200,
    marginTop: 20,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#FFB6C1',
    shadowColor: '#FFB6C1',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
});
