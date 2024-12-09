import AsyncStorage from '@react-native-async-storage/async-storage';

export const UpdateRestaurant = async (
  restaurantDetails,
  tags,
  initialRestaurant,
  GOOGLE_MAPS_API_KEY
) => {
  try {
    // Validate input
    if (!restaurantDetails || !restaurantDetails.address) {
      throw new Error("Invalid restaurant details provided.");
    }

    if (!initialRestaurant || !initialRestaurant.id) {
      throw new Error("Initial restaurant object is invalid.");
    }

    console.log("Starting to fetch geolocation from Google Maps API...");

    // Call Google Maps API to get geolocation
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        restaurantDetails.address
      )}&key=${GOOGLE_MAPS_API_KEY}`
    );

    const data = await response.json();
    console.log("Google Maps API response:", data);

    // Check if location data was successfully fetched
    if (data.status === 'OK' && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      const fullAddress = data.results[0].formatted_address;

      const updatedRestaurant = {
        ...restaurantDetails,
        tags: tags || [],
        latitude: location.lat,
        longitude: location.lng,
        address: fullAddress,
        mapLink: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
          fullAddress
        )}`,
      };

      console.log("Updated restaurant object:", updatedRestaurant);

      // Fetch current restaurant list
      const currentRestaurants = await AsyncStorage.getItem('restaurantDetails');
      const restaurantList = currentRestaurants ? JSON.parse(currentRestaurants) : [];

      // Find the index to update
      const index = restaurantList.findIndex(
        (restaurant) => restaurant.id === initialRestaurant.id
      );

      if (index !== -1) {
        restaurantList[index] = updatedRestaurant;
      } else {
        console.warn("Restaurant not found in list, adding as a new entry.");
        restaurantList.push(updatedRestaurant);
      }

      // Save back to AsyncStorage
      await AsyncStorage.setItem('restaurantDetails', JSON.stringify(restaurantList));
      console.log("Restaurant list updated successfully.");

      return updatedRestaurant;
    } else {
      throw new Error('Unable to fetch location for the given address.');
    }
  } catch (error) {
    console.error("Error in UpdateRestaurant function:", error.message);
    // Only re-throw critical errors
    throw new Error(`Failed to update restaurant: ${error.message}`);
  }
};
