import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Routes from './routesNames'

import HousekeepingIcon from '../Components/Icons/Housekeeping'
import SettingsIcon from '../Components/Icons/Settings'
import HomeIcon from '../Components/Icons/Home'
import SearchIcon from '../Components/Icons/Search'
import BottomTabNavigation from '../Components/BottomTabNavigation/BottomTabNavigation'

import Dashboard from '../Screens/Dashboard'
import Search from '../Screens/Search'
import Houskeeping from '../Screens/Housekeeping'
import Settings from '../Screens/Settings'

const Tab = createBottomTabNavigator()

const MainStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={props => <BottomTabNavigation {...props} />}>
      <Tab.Screen
        name={Routes.Home}
        component={Dashboard}
        options={{
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
      />
      <Tab.Screen
        name={Routes.Search}
        component={Search}
        options={{
          tabBarIcon: ({ color }) => <SearchIcon color={color} />,
        }}
      />
      <Tab.Screen
        name={Routes.Housekeeping}
        component={Houskeeping}
        options={{
          tabBarIcon: ({ color }) => <HousekeepingIcon color={color} />,
        }}
      />
      <Tab.Screen
        name={Routes.Settings}
        component={Settings}
        options={{
          tabBarIcon: ({ color }) => <SettingsIcon color={color} />,
        }}
      />
    </Tab.Navigator>
  )
}

export default MainStack
