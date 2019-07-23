import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import HomeScreen from '../screens/HomeScreen'
import LinksScreen from '../screens/LinksScreen'
import SettingsScreen from '../screens/SettingsScreen'

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
})

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
)

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={ focused }
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${ focused ? '' : '-outline' }`
          : 'md-information-circle'
      }
    />
  ),
}

HomeStack.path = ''

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
)

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={ focused } name={ Platform.OS === 'ios' ? 'ios-link' : 'md-link' } />
  ),
}

LinksStack.path = ''

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
)

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={ focused } name={ Platform.OS === 'ios' ? 'ios-options' : 'md-options' } />
  ),
}

SettingsStack.path = ''

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
}, {
  tabBarOptions: {
    activeTintColor: '#F57C00',
    inactiveTintColor: '#7B8BA2',
    style: {
      height: 55,
      backgroundColor: '#FFFFFF',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.05,
      shadowRadius: 1,
      borderTopWidth: 0,
      borderTopColor: '#D8D8D8',
      elevation: 5,
    }
  },
})

tabNavigator.path = ''

export default tabNavigator
