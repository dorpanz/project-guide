// SplashScreen.js

import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Navigate to the next screen (e.g., Home screen) after 3 seconds
    const timer = setTimeout(() => {
      navigation.replace("Home"); // Replace "Home" with the name of your next screen
    }, 3000);

    return () => clearTimeout(timer); // Cleanup the timer
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require("C:\Users\manya\OneDrive\Pictures\Splash Icon.png")} // Replace with the path to your logo image
        style={styles.logo}
      />
      <Text style={styles.appName}>Personal Restaurant Guide</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5", // Background color
  },
  logo: {
    width: 150, // Adjust size as needed
    height: 150,
    marginBottom: 20,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});

export default SplashScreen;
