import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HousekeepingIcon from '../Components/Icons/Housekeeping'
import SettingsIcon from '../Components/Icons/Settings'
import HomeIcon from '../Components/Icons/Home'
import SearchIcon from '../Components/Icons/Search'

import Dashboard from '../Screens/Dashboard/Dashboard'
import Search from '../Screens/Search/Search'
import Houskeeping from '../Screens/Housekeeping/Housekeeping'
import Settings from '../Screens/Settings/Settings'
import BottomTabNavigation from '../Components/BottomTabNavigation/BottomTabNavigation'
import AddNote from '../Screens/AddNote/AddNote'

const Tab = createBottomTabNavigator()

const MainStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={props => <BottomTabNavigation {...props} />}>
      <Tab.Screen
        name="Home"
        component={Dashboard}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeIcon color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color }) => (
            <SearchIcon color={color} />
          )
        }}
      />
      <Tab.Screen
        name="AddNote"
        component={AddNote}
        options={{
          addButton: true,
        }}
      />
      <Tab.Screen
        name="Housekeeping"
        component={Houskeeping}
        options={{
          tabBarIcon: ({ color }) => (
            <HousekeepingIcon color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ color }) => (
            <SettingsIcon color={color} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

export default MainStack
