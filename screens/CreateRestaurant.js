import AsyncStorage from '@react-native-async-storage/async-storage';

export const CreateRestaurant = async (restaurantDetails, tags, GOOGLE_MAPS_API_KEY) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        restaurantDetails.address
      )}&key=${GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();

    if (data.status === 'OK' && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      const fullAddress = data.results[0].formatted_address;

      const newRestaurant = {
        ...restaurantDetails,
        tags,
        latitude: location.lat,
        longitude: location.lng,
        address: fullAddress,
        mapLink: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
          fullAddress
        )}`,
        id: Date.now().toString(),
      };

      const currentRestaurants = await AsyncStorage.getItem('restaurantDetails');
      const restaurantList = currentRestaurants ? JSON.parse(currentRestaurants) : [];
      restaurantList.push(newRestaurant);

      await AsyncStorage.setItem('restaurantDetails', JSON.stringify(restaurantList));
      return newRestaurant;
    } else {
      throw new Error('Unable to fetch location for the given address.');
    }
  } catch (error) {
    throw new Error(`Failed to create restaurant: ${error.message}`);
  }
};
