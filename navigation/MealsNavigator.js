import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import Colors from '../constants/Colors';

const defaultStackNavOptions = {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
    };

const MealsNavigator = createStackNavigator({
    Categories: CategoriesScreen,
    CategoryMeals: CategoryMealScreen,
    // Alternate version below (JSX object)
    // CategoryMeals: {
    //     screen: CategoryMealScreen
    // }
    MealDetail: MealDetailScreen
}, {
    defaultNavigationOptions: defaultStackNavOptions
});

const FavNavigator = createStackNavigator({
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen
}, {
    defaultNavigationOptions: defaultStackNavOptions
});

const tabScreenConfig = {
    Meals: {screen: MealsNavigator, navigationOptions: {
        tabBarIcon: (tabInfo) => {
            return <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />;
        },
        tabBarColor: Colors.primaryColor
    }},
    Favorites: {screen: FavNavigator, navigationOptions: {
        tabBarLabel: 'Favourites',
        tabBarIcon: (tabInfo) => {
            return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />;
        },
        tabBarColor: Colors.accentColor
    }}
}

const MealsFavTabNavigator = 
    Platform.OS === 'android' 
        ? createMaterialBottomTabNavigator(tabScreenConfig, {
            activeColor: 'white',
            shifting: true
        }) 
        : createBottomTabNavigator(tabScreenConfig, {
            tabBarOptions: {
                activeTintColor: Colors.accentColor
            }
    });

export default createAppContainer(MealsFavTabNavigator);