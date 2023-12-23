import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import TicketScreen from '../screens/TicketScreen';
import { COLORS, FONTSIZE, SPACING } from '../themes/theme';
import CustomIcon from '../components/CustomIcon';

const Tab = createBottomTabNavigator();


const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{tabBarHideOnKeyboard:true,headerShown:false,tabBarStyle: {
        backgroundColor:COLORS.Black,
        borderTopWidth : 0,
        height :SPACING.space_10*10,
    }}}>
    <Tab.Screen name="Home" component={HomeScreen} options={{
        tabBarShowLabel:false,
        tabBarIcon:({focused,color,size}) => {
            return (
                <View style={[styles.activeTabBar,focused ? {backgroundColor:COLORS.Red} : {}]}>
                    <CustomIcon name='video' color={COLORS.White} size={FONTSIZE.size_24} />
                </View>
            )
        }
    }} />
    <Tab.Screen name="Search" component={SearchScreen} options={{
        tabBarShowLabel:false,
        tabBarIcon:({focused,color,size}) => {
            return (
                <View style={[styles.activeTabBar,focused ? {backgroundColor:COLORS.Red} : {}]}>
                    <CustomIcon name='search' color={COLORS.White} size={FONTSIZE.size_24} />
                </View>
            )
        }
    }}/>
    <Tab.Screen name="Ticket" component={TicketScreen} options={{
        tabBarShowLabel:false,
        tabBarIcon:({focused,color,size}) => {
            return (
                <View style={[styles.activeTabBar,focused ? {backgroundColor:COLORS.Red} : {}]}>
                    <CustomIcon name='ticket' color={COLORS.White} size={FONTSIZE.size_24} />
                </View>
            )
        }
    }}/>
  </Tab.Navigator>
  )
}

export default TabNavigator

const styles = StyleSheet.create({
    activeTabBar : {
        backgroundColor:COLORS.Black,
        padding:SPACING.space_18,
        borderRadius  :SPACING.space_18*10,
    }
})