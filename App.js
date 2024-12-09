import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import AddEditRestaurantScreen from './screens/AddEditRestaurantScreen';
import RestaurantListScreen from './screens/RestaurantListScreen';
import RestaurantDetailsScreen from './screens/RestaurantDetailsScreen';
import MapScreen from './screens/MapScreen';
import AboutScreen from './screens/AboutScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


function RestaurantStack() {
  return (
    <Stack.Navigator initialRouteName="RestaurantList">
      <Stack.Screen name="RestaurantList" component={RestaurantListScreen} />
      <Stack.Screen name="Details" component={RestaurantDetailsScreen} />
      <Stack.Screen name="AddRestaurant" component={AddEditRestaurantScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Restaurants') {
              iconName = 'restaurant';
            } else if (route.name === 'Map') {
              iconName = 'map';
            } else if (route.name === 'About') {
              iconName = 'information-circle';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#FF69B4',  
          tabBarInactiveTintColor: 'dark gray',  
        })}
      >
        <Tab.Screen
          name="Restaurants"
          component={RestaurantStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="About" component={AboutScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
